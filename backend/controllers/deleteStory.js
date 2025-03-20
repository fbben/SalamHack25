const mongoose = require('mongoose');
const StoryModel = require('../models/Story');

const deleteStory = async (req,res,next)=>{
try {
    const { id } = req.params;
    const story = await StoryModel.findById(id);

    if (!story){
        return res.status(404).json({message : "Story not found"});
    }

// Delete the story, triggering the pre-deleteOne middleware to delete the associated ParentPromptawait story.deleteOne();
    await story.deleteOne();
// response
    return res.json({message : "Story deleted successfully"});

    }catch (error){
        return res.status(500).json({message:"Error while deleting Story"});
    }
}
module.exports = deleteStory;