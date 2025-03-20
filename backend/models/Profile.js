const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  profile_picture: { type: String , required: false ,default: ""},
  access_key_to_ai: { type: String , required : false,default: ""}
});

module.exports = mongoose.model("Profile", profileSchema);
