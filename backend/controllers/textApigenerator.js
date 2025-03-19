import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ParentPrompt from "../models/ParentPrompt.js";

dotenv.config();

const token = process.env.AZURE_API_KEY;
if (!token) {
    throw new Error("AZURE_API_KEY is not set in environment variables.");
}

// Connect to MongoDB (only if not already connected)
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));
}

// Retrieve the first parent prompt from MongoDB
async function getFirstParentPrompt() {
    return await ParentPrompt.findOne().lean();
}

// Generate story function
export async function generateStory(req, res) {
    try {
        const parentPrompt = await getFirstParentPrompt();
        if (!parentPrompt) {
            return res.status(404).json({ error: "No parent prompt found in the database." });
        }

        const promptText = `قم بإنشاء كائن JSON منظم حيث يمثل كل عنصر صفحة من القصة باللغة العربية.
        استخدم الخصائص التالية:
        - Position: ترتيب الصفحة (1, 2, 3, ...)
        - Content: محتوى الصفحة.

        استند إلى هذه التفاصيل:
        - الموضوع: ${parentPrompt.theme}
        - الأسلوب السردي: ${parentPrompt.narrative_style}
        - الطول: ${parentPrompt.length}
        - النغمة: ${parentPrompt.tone}
        - الأماكن والديكور: ${parentPrompt.locations_and_decor}
        - البيئة: ${parentPrompt.environment}
        - الحقبة الزمنية: ${parentPrompt.era}
        - القيم الأخلاقية: ${parentPrompt.morals}
        - الرسالة: ${parentPrompt.message}
        - عدد الشخصيات: ${parentPrompt.num_characters}

        يجب أن يكون التنسيق بالشكل التالي:
        [
          { "position": "1", "content": "..." },
          { "position": "2", "content": "..." }
        ]`;

        const client = ModelClient(
            "https://models.inference.ai.azure.com",
            new AzureKeyCredential(token)
        );

        const response = await client.path("/chat/completions").post({
            body: {
                messages: [
                    { role: "system", content: "" },
                    { role: "user", content: promptText }
                ],
                model: "gpt-4o-mini",
                temperature: 0.8,
                max_tokens: 2048,
                top_p: 0.1
            }
        });

        if (isUnexpected(response)) {
            throw response.body.error;
        }

        let content = response.body.choices[0].message.content;
        content = content.replace(/```json\s*([\s\S]*?)\s*```/g, '$1').trim();

        try {
            const jsonData = JSON.parse(content);
            return res.json(jsonData);
        } catch (error) {
            return res.status(500).json({ error: "Failed to parse AI response", raw_response: content });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
