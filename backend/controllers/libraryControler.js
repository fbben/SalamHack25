const Story = require("../models/Story"); // Assure-toi que le modèle est bien importé

const getAllStories = async (req, res) => {
  try {
    // Récupère toutes les stories avec uniquement `title` et `storyPages.image_link` (première image)
    const stories = await Story.find();

    // Reformate les données pour ne garder que la première image de chaque story
    const formattedStories = stories.map(story => ({
      title: story.title,
      image: story.storyPages.length > 0 ? story.storyPages[0].image_link : null
    }));

    res.status(200).json(formattedStories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { getAllStories };
