const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required : true},
  password_hash: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);