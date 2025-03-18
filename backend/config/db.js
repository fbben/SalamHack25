require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};


// Glose the connection to the database
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected.");
  } catch (err) {
    console.error("Error disconnecting MongoDB:", err);
  }
};


module.exports = { connectDB, closeDB };