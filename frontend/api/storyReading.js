import {BASE_URL} from "./utilities"

async function fetchStoryReadingData(storyId){
    try {
        const response = await fetch(`http://192.168.100.6:5000/api/v1/story-reading/${storyId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Parse response as JSON
    } catch (error) {
        console.error("Error fetching story data:", error);
        throw error;
    }
};

module.exports = { fetchStoryReadingData };