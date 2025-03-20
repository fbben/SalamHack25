import mongoose from "mongoose";
import ParentPrompt from "../models/ParentPrompt.js"; 

// MongoDB Connection
async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/myschema", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected!");
}

// Example Data
const examplePrompt = {
    story_id: new mongoose.Types.ObjectId(), 
    theme: "رياضة",
    narrative_style: "الراوي العليم",
    length: "متوسط",
    tone: "ملهم",
    locations_and_decor: "ملاعب كرة القدم، الشوارع حيث يتدرب الأطفال، أكاديمية رياضية حديثة",
    environment: "حضري",
    era: "الحاضر",
    morals: "المثابرة والعمل الجاد يقودان إلى النجاح",
    message: "الإيمان بالحلم والسعي المستمر يجعلان المستحيل ممكنًا",
    num_characters: 3,
    audio_choice: "موسيقى تحفيزية وحماسية"
  }
  ;

// Function to Populate Database
async function savePrompt() {
  await connectDB();

  try {
    const newPrompt = new ParentPrompt(examplePrompt);
    const savedPrompt = await newPrompt.save();
    console.log("Saved successfully:", savedPrompt);
  } catch (error) {
    console.error("Error saving:", error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the Function
savePrompt();
