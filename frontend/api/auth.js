import * as SecureStore from 'expo-secure-store';

import {BASE_URL} from require("./utilities")
const AUTH_URL = `${BASE_URL}/auth`;

async function signup(data) {
  const response = await fetch(`${BASE_URL}/signup`, {
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
  const response = await fetch(`${BASE_URL}/login`, {
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