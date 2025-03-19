import * as SecureStore from 'expo-secure-store';

async function storeToken(token) {
  try {
    await SecureStore.setItemAsync('userToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token', error);
  }
}



async function getStoredToken() {
  try {
    return await SecureStore.getItemAsync('userToken');
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
}

async function checkStoredToken() {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    console.log("Stored Token:", token);
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
}

module.exports = {storeToken, checkStoredToken, getStoredToken }