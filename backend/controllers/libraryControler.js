const Story = require("../models/Story"); // Assure-toi que le modèle est bien importé

const getAllStories = async (req, res) => {
  try {
    // Récupère toutes les stories avec uniquement `title` et `storyPages.image_link` (première image)
    const stories = await Story.find();

    // Reformate les données pour ne garder que la première image de chaque story
 

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { getAllStories };
