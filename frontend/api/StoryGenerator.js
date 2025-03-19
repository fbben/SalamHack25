const API_URL = "https://my-api.com/generate-story";

export const generateStory = async (preferences) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });
    if (!response.ok) {
      throw new Error("Failed to generate story.");
    }
    const data = await response.json();
    return data; // this data contains the generated story.
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};
