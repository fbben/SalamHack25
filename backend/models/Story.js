const mongoose = require("mongoose");
require('mongoose-type-url');

const storySchema = new mongoose.Schema({
  library_id: { type: mongoose.Schema.Types.ObjectId, ref: "Library", required: true },
  title: { type: String, required: true },
  summary: { type: String },
  created_at: { type: Date, default: Date.now,immutable: true },
  parent_prompt_id: {// story properties
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParentPrompt",
    unique: true // Ensures One-to-One relationship
  },
  storyPages: [
    {
      content: { type: String, required: true }, // Page text content
      image_link: { type: String }, // URL to image (e.g., stored in Cloudinary)
      // audio attribut
    }],
},);
// used as middlware to delete the associated parent prompt before deleting story
storySchema.pre("deleteOne",{document : true,query : false},async function (next){
  try {
      await mongoose.model("ParentPrompt").deleteOne({ _id: this.parent_prompt_id });
    next();
  }catch(error){
   next(error);
  }
});

module.exports =  mongoose.model("Story", storySchema);


