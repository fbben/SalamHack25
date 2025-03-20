import { storeToken, checkStoredToken, getStoredToken } from "../utils/expoStorage";
const BASE_URL = "http://192.168.100.6:5000/api/v1/library";

async function retrieveStories() {
  // Make sure to await the token if getStoredToken returns a promise
  const token = await getStoredToken();

  const response = await fetch(`${BASE_URL}/stories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "retrieveStories failed");
  }

  return responseData;
}

module.exports = { retrieveStories };