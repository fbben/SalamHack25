const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  profile_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true,unique : true },
  date: { type: Date, default: Date.now ,immutable: true}
});

module.exports = mongoose.model("Library", librarySchema);
