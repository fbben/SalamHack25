import * as SecureStore from 'expo-secure-store';

import {BASE_URL} from "./utilities"
const AUTH_URL = `${BASE_URL}/auth`;

async function signup(data) {
  const response = await fetch(`http://192.168.100.6:5000/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
      throw new Error(responseData.message || "Signup failed");
  }

  return responseData;
}

async function login(data) {
  const response = await fetch(`http://192.168.100.6:5000/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Login failed");
  }

  return responseData;
}

module.exports = { signup, login }