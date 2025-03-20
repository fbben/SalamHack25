const API_BASE_URL = "http://localhost:5000/api/v1/"; // Replace with your backend URL

async function fetchStoryReadingData(storyId){
    try {
        const response = await fetch(`${API_BASE_URL}/story-reading/${storyId}`, {
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