const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  profile_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
  category: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Library", librarySchema);
