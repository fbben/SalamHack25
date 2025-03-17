const mongoose = require("mongoose");

const parentPromptSchema = new mongoose.Schema({
  story_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Story", 
    unique: true, // One-to-One relationship
    required: true 
  },
  theme: { type: String, required: true }, // Story theme
  narrative_style: { type: String }, // Narrative style (e.g., first-person, third-person)
  length: { type: String }, // Story length (short, medium, long)
  tone: { type: String }, // Emotional tone (serious, funny, dramatic, etc.)
  locations_and_decor: { type: String }, // Description of locations and decor
  environment: { type: String }, // Story environment (urban, nature, fantasy, etc.)
  era: { type: String }, // Time period (past, present, future)
  morals: { type: String }, // Ethical/moral message in the story
  message: { type: String }, // Main takeaway from the story
  num_characters: { type: Number }, // Number of main characters
  audio_choice: { type: String } // Audio preferences (if applicable)
});

module.exports = mongoose.model("ParentPrompt", parentPromptSchema);
