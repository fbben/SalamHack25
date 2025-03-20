// import Replicate from "replicate";
// import dotenv from "dotenv";
// import fs from "fs";
// import axios from "axios";
// import mongoose from "mongoose";
// import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
// import { AzureKeyCredential } from "@azure/core-auth";
// import ParentPrompt from "../models/ParentPrompt.js";
// import translate from 'google-translate-api-x';

const replicate = require("replicate");
const dotenv = require("dotenv");
const fs = require("fs");
const axios = require("axios");
const mongoose = require("mongoose");
const { ModelClient, isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const translate = require("google-translate-api-x");
const ParentPrompt = require("../models/ParentPrompt");



const generateStory = async function (req, res) {
    try {
        const storyPages = await generateStoryText();

        if (!Array.isArray(storyPages) || storyPages.length === 0) {
            return res.status(500).json({ error: "Generated story is empty or invalid"});
        }

        const storyWithImageslink = [];
        for (const page of storyPages) {
            // const imageUrl = await generateImage(page);
            // storyWithImages.push({ ...page, image: imageUrl });
            storyWithImageslink.push({ ...page, image: "imageUrl"});
        }

        return res.json(storyWithImageslink);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



const generateStoryText = async function () {
const AZURE_API_KEY = process.env.AZURE_API_KEY;

if (!AZURE_API_KEY) {
    throw new Error("AZURE_API_KEY is not set in environment variables.");
}

    // retreive Prompt
    const parentPrompt = await getFirstParentPrompt();
    console.log("parentPrompt of storyGenerator is : ",parentPrompt);
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

    try {
        return JSON.parse(content);
    } catch (error) {
        console.log(content);
        throw new Error(" Failed to parse AI response");
    }
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
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

if (!REPLICATE_API_KEY) {
    throw new Error("REPLICATE_API_KEY is not set in environment variables.");
}
        const replicate = new Replicate({ auth: !REPLICATE_API_KEY });

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



module.exports = generateStory;