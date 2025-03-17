const connectDB = require("../config/db");

require("dotenv").config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});