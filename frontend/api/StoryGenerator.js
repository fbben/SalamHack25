import {BASE_URL} from "./utilities"
const AUTH_URL = `${BASE_URL}/story_create`
import { storeToken, checkStoredToken, getStoredToken } from "../utils/expoStorage";

export const generateStory = async (preferences) => {
  try {

    const token = await getStoredToken();

    const response = await fetch("http://192.168.100.6:5000/api/v1/story_create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
