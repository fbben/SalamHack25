const Story = require("../models/Story"); 
const getAllStories = async (req, res) => {
  try {
    
    const stories = await Story.find();

  
 

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { getAllStories };
