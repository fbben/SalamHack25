const replicate = require("replicate");
const dotenv = require("dotenv");
const fs = require("fs");
const axios = require("axios");
const mongoose = require("mongoose");
const { ModelClient, isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");
const translate = require("google-translate-api-x");
const ParentPrompt = require("../../models/ParentPrompt");




const generateImage = async function (page) {
    try {
        const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
        if (!REPLICATE_API_KEY) {
            throw new Error("REPLICATE_API_KEY is not set in environment variables.");
}
        const replicate = new replicate({ auth: process.env.REPLICATE_API_KEY });

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

module.exports = generateImage;