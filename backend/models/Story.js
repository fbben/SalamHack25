const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  library_id: { type: mongoose.Schema.Types.ObjectId, ref: "Library", required: true },
  title: { type: String, required: true },
  theme: { type: String },
  summary: { type: String },
  climate: { type: String },
  locations: { type: String },
  decor: { type: String },
  environment: { type: String },
  era: { type: String },
  created_at: { type: Date, default: Date.now },
  parent_prompt_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ParentPrompt", 
    unique: true // Ensures One-to-One relationship
  }
});

module.exports = mongoose.model("Story", storySchema);
