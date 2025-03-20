import axios from 'axios';
import dotenv from 'dotenv';
import translate from 'google-translate-api-x';

dotenv.config({path:'../.env'});
//this programe is for testing only u can delete it without a probleme

async function translateToEnglish(text) {
    try {
        const res = await translate(text, { from: 'ar', to: 'en' });
        console.log("Translated Text:", res.text);
        return res.text;
    } catch (error) {
        console.error("Translation Error:", error.message);
        return text;
    }
}

async function generateImage(prompt) {
    const apiKey = process.env.REPLICATE_API_KEY;
    const model = "recraft-ai/recraft-v3";
    const url = `https://api.replicate.com/v1/predictions`;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const data = {
        version: "latest",
        input: {
            prompt: prompt,
            width: 512,
            height: 512,
            num_outputs: 1
        }
    };

    try {
        const response = await axios.post(url, data, { headers: headers });
        const prediction = response.data;
        console.log("Prediction URL:", prediction.urls.get);
        return prediction;
    } catch (error) {
        console.error("Error generating image:", error.response ? error.response.data : error.message);
        throw error;
    }
}

async function main() {
    const textInArabic = "مرحبًا، كيف حالك؟";
    const translatedText = await translateToEnglish(textInArabic);
    const image = await generateImage(translatedText);
    console.log("Generated image:", image);
}

main();
