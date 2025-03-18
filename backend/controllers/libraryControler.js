const Story = require("../models/Story"); 
const getAllStories = async (req, res) => {
  try {
    
    const stories = await Story.find();

    
    const formattedStories = stories.map(story => ({
      title: story.title,
      image: story.storyPages.length > 0 ? story.storyPages[0].image_link : null
    }));

    res.status(200).json(formattedStories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getAllStories };
