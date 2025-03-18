const BASE_URL = "http://192.168.100.6:5000/api/v1/auth";

export async function signup(data) {
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