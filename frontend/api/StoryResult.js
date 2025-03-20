const API_URL = "https://my-api.com/stories";

export const deleteStory = async (storyId) => {
  try {
    const response = await fetch(`http://192.168.100.6:5000/api/v1/story_delete/${storyId} `, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the story.");
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting story:", error);
    return { success: false, error: error.message };
  }
};
