const express = require("express");

const { generateStory  } = require("../controllers/storyGenerator");

const router = express.Router();

router.get("/generate", generateStory );// file will be removed

module.exports = router;
