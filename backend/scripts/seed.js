require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Ensure correct path

const { saltRounds } = require("../utils/globals")

const { connectDB, closeDB } = require("../config/db")

const users = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "securepass",
  },
  {
    username: "michael_jordan",
    email: "mj23@example.com",
    password: "airjordan",
  },
];

const populateDB = async () => {
    try {

    await connectDB()

    // Hash passwords before saving users
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password_hash: await bcrypt.hash(user.password, saltRounds), // Hash password
      }))
    );

    // Remove password field (since we now have password_hash)
    usersWithHashedPasswords.forEach(user => delete user.password);

    // Clear existing users
    await User.deleteMany();
    console.log("Existing users removed.");

    // Insert new users
    await User.insertMany(usersWithHashedPasswords);
    console.log("Database populated with sample users!");

    // Close connection
    await closeDB()
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error populating database:", err);
    await closeDB()
  }
};

populateDB();
