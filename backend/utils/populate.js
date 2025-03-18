const mongoose = require("mongoose");
const Story = require("../models/Story"); // Assure-toi que ce fichier contient le schéma Story

// Connexion à MongoDb

async function seedDatabase() {
  try {
    await Story.deleteMany(); // Supprime toutes les anciennes entrées (optionnel)

    const stories = [
      {
        library_id: new mongoose.Types.ObjectId(),
        title: "The Lost World",
        theme: "Adventure",
        summary: "A group of explorers discover a hidden island.",
        climate: "Tropical",
        locations: "Jungle, Volcano, River",
        decor: "Ancient ruins",
        environment: "Wild nature",
        era: "Modern",
        parent_prompt_id: new mongoose.Types.ObjectId(),
        storyPages: [
          { content: "Our journey begins in the heart of the jungle.", image_link: "jungle.png" },
          { content: "We discover an ancient ruin.", image_link: "ruins.png" }
        ]
      },
      {
        library_id: new mongoose.Types.ObjectId(),
        title: "Cyber Future",
        theme: "Sci-Fi",
        summary: "A hacker fights against a dystopian AI government.",
        climate: "Artificial",
        locations: "Cyber City, Underground Base",
        decor: "Neon lights, Holograms",
        environment: "High-tech",
        era: "Futuristic",
        parent_prompt_id: new mongoose.Types.ObjectId(),
        storyPages: [
          { content: "In the year 2099, technology controls everything.", image_link: "cybercity.png" },
          { content: "The resistance gathers in the underground.", image_link: "underground.png" }
        ]
      },
      {
        library_id: new mongoose.Types.ObjectId(),
        title: "Medieval Legends",
        theme: "Fantasy",
        summary: "A knight must defeat a dragon to save his kingdom.",
        climate: "Cold",
        locations: "Castle, Dark Forest, Mountain",
        decor: "Stone castles, Wooden villages",
        environment: "Medieval",
        era: "Middle Ages",
        parent_prompt_id: new mongoose.Types.ObjectId(),
        storyPages: [
          { content: "The king calls upon the bravest knight.", image_link: "castle.png" },
          { content: "The final battle against the dragon begins.", image_link: "dragon.png" }
        ]
      }
    ];

    await Story.insertMany(stories);
    console.log("Database seeded with 3 stories!");
    
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close(); // Ferme la connexion après insertion
  }
}

// Exécute la fonction
seedDatabase();
