const replicate = require("replicate");
const dotenv = require("dotenv");
const fs = require("fs");
const axios = require("axios");
const mongoose = require("mongoose");
const { AzureKeyCredential } = require("@azure/core-auth");
const ParentPrompt = require("../../models/ParentPrompt");
const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");


const generateStoryText = async function (inputparentPrompt) {
    try {
    const AZURE_API_KEY = process.env.AZURE_API_KEY;

if (!AZURE_API_KEY) {
    throw new Error("AZURE_API_KEY is not set in environment variables.");
}

    // retreive Prompt document like the result of getFirstParentPrompt
    const parentPrompt = await getFirstParentPrompt();
    if (!parentPrompt) {
        throw new Error("No parent prompt found in the database.");
    }

    const promptText = `رجاءً، قم بإرجاع القصة فقط ككائن JSON منظم بدون أي نص إضافي أو تفسيرات. يجب أن يكون الإخراج مطابقًا للتنسيق التالي تمامًا:
    [
      { "position": "1", "content": "السطر الأول\nالسطر الثاني" },
      { "position": "2", "content": "السطر الأول\nالسطر الثاني" }
    ]
    
    🔹 **تفاصيل القصة:**
      - الفكرة الأساسية للنص: ${parentPrompt.main_idea}
      - الموضوع: ${parentPrompt.theme}
      - الأسلوب السردي: ${parentPrompt.style}
      - تفاصيل عن القصة: ${parentPrompt.details}
      - طول القصة: ${parentPrompt.length}
      - القيم الأخلاقية والرسالة المستهدفة: ${parentPrompt.lesson}
      - عدد الشخصيات: ${parentPrompt.characters_number}
      - جو القصة: ${parentPrompt.atmospher}

    📌 **ملاحظة:**
    1. يجب أن يحتوي كل عنصر (content) في المصفوفة على محتوى يتألف من سطرين على الأقل.
    2. يجب أن يكون الإخراج كائن JSON صالحًا فقط، دون أي نص إضافي أو تعليقات.
    `;

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


        return JSON.parse(content);
    } catch (error) {
        console.log(error.message);
        throw new Error(" Failed to parse AI response");
    }
}

async function getFirstParentPrompt() {
    return await ParentPrompt.findOne().lean();
}

module.exports= generateStoryText;