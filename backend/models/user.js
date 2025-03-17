const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  first_name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, sparse: true , required : true},
  phone_number: { type: String, unique: true, sparse: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
