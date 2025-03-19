const { connectDB, closeDB } = require("../config/db");

require("dotenv").config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});



// Close the connection to the database when the server is closed
process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing server...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing server...");
  await closeDB();
  process.exit(0);
});