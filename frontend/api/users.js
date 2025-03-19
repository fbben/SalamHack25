import * as SecureStore from 'expo-secure-store';


async function getProfileData(token) {
  const response = await fetch("http://192.168.100.6:5000/api/v1/users/profile", {
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