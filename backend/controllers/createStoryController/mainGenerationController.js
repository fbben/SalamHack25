const  generateStoryText = require ("../createStoryController/GenerateText");
const  generateImage = require ("../createStoryController/GenerateImage");

const generateStoryPages = async function (prompt) {
    try {
        const storyPages = await generateStoryText(prompt);

        if (!Array.isArray(storyPages) || storyPages.length === 0) {
            thre( "Generated story is empty or invalid");
        }

        const storyWithImageslink = [];
        for (const page of storyPages) {
            // const imageUrl = await generateImage(page);
            // storyWithImages.push({ ...page, image: imageUrl });
            storyWithImageslink.push({ ...page, image: "imageUrl"});
        }

        return res.storyWithImageslink;
    } catch (error) {
        throw new Error ("Undefined problem while generating story content ");
    }
}

module.exports = generateStoryPages;