import Replicate from "replicate";
import dotenv from "dotenv";
import fs from "fs";
import axios from "axios";
import mongoose from "mongoose";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import ParentPrompt from "../models/ParentPrompt.js";
import translate from 'google-translate-api-x';

dotenv.config({ path: '../.env' });

const AZURE_API_KEY = process.env.AZURE_API_KEY;
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const MONGO_URI = process.env.MONGO_URI;


/// important : we need an api for the image generator , find one !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


if (!AZURE_API_KEY || !REPLICATE_API_KEY) {
    throw new Error("AZURE_API_KEY or REPLICATE_API_KEY is not set in environment variables.");
}


async function generateStoryText() {
    // retreive Prompt
    const parentPrompt = await getFirstParentPrompt();
    if (!parentPrompt) {
        throw new Error("No parent prompt found in the database.");
    }

    const promptText = `رجاءً، قم بإرجاع القصة فقط ككائن JSON منظم بدون أي نص إضافي.
    [
      { "position": "1", "content": "..." },
      { "position": "2", "content": "..." }
    ]

    🔹 **تفاصيل القصة:**
    - **الموضوع:** ${parentPrompt.theme}
    - **الأسلوب السردي:** ${parentPrompt.narrative_style}
    - **الطول:** ${parentPrompt.length}
    - **النغمة:** ${parentPrompt.tone}
    - **الأماكن والديكور:** ${parentPrompt.locations_and_decor}
    - **البيئة:** ${parentPrompt.environment}
    - **الحقبة الزمنية:** ${parentPrompt.era}
    - **القيم الأخلاقية:** ${parentPrompt.morals}
    - **الرسالة:** ${parentPrompt.message}
    - **عدد الشخصيات:** ${parentPrompt.num_characters}

    📌 **ملاحظة:** يجب أن يكون الإخراج كائن JSON صالحًا فقط.`;

    const client = ModelClient(
        "https://models.inference.ai.azure.com",
        new AzureKeyCredential(AZURE_API_KEY)
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
        return JSON.parse(content);
    } catch (error) {
        console.log(content);
        throw new Error(" Failed to parse AI response");
    }
}


//! probably second connection to the database
if (!mongoose.connection.readyState) {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log(" MongoDB Connected"))
    .catch(err => console.error(" MongoDB Connection Error:", err));
}

async function translateToEnglish(text) {
    try {
        const res = await translate(text, { from: 'ar', to: 'en' });
        console.log(" Translated Text:", res.text);
        return res.text;
    } catch (error) {
        console.error("Translation Error:", error.message);
        return text;
    }
}
//! get prompt from createstory controller
async function getFirstParentPrompt() {
    return await ParentPrompt.findOne().lean();
}


async function generateImage(page) {
    try {
        const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });
        
        const translatedContent = await translateToEnglish(page.content);
        const response = await replicate.run(
            "stability-ai/stable-diffusion-2",
            {
                input: {
                    prompt: translatedContent,
                    width: 512,
                    height: 512,
                    num_outputs: 1
                }
            }
        );
        
        

        if (response && response.length > 0) {
            return response[0];
        } else {
            console.error(` Error generating image for page ${page.position}:`, response);
            return null;
        }
    } catch (error) {
        console.error(` Image generation failed for page ${page.position}:`, error.message);
        return null;
    }
}


export async function generateStory(req, res) {
    try {
        const storyPages = await generateStoryText();

        if (!Array.isArray(storyPages) || storyPages.length === 0) {
            return res.status(500).json({ error: "Generated story is empty or invalid" });
        }

        const storyWithImages = [];
        for (const page of storyPages) {
            const imageUrl = await generateImage(page);
            storyWithImages.push({ ...page, image: imageUrl });
        }

        return res.json(storyWithImages);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
