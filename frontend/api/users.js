import * as SecureStore from 'expo-secure-store';

import {BASE_URL} from require("./utilities")
const USERS_URL = `${BASE_URL}/users`;

async function getProfileData(token) {
  const response = await fetch(`${USERS_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to fetch profile data");
  }
  
  return responseData;
}

module.exports = { getProfileData }