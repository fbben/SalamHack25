const express = require("express");

const  generateStory   = require("../controllers/storyGenerator");

const router = express.Router();

router.get("/generate", generateStory );

module.exports = router;
