const mongoose = require("mongoose");

const storyPageSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Page text content
  image_link: { type: String }, // URL to image (e.g., stored in Cloudinary)
});

module.exports = storyPageSchema; // Export the schema (not a model, because it will be embedded)
