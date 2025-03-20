import { storeToken, checkStoredToken, getStoredToken } from "../utils/expoStorage";

import {BASE_URL} from require("./utilities")
const AUTH_URL = `${BASE_URL}/library`


const retrieveStories = async () => {
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

export default retrieveStories