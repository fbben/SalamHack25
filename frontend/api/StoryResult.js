const API_URL = "https://my-api.com/stories";

export const deleteStory = async (storyId) => {
  try {
    const response = await fetch(`${API_URL}/${storyId}`, {
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
