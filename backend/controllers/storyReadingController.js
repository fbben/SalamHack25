const StoryModel = require('../models/Story');

const getStoryReadingById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await StoryModel.findById(id);

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.json(story);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = getStoryReadingById;