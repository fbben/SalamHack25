const express = require("express");

const { generateStory } = require("../controllers/textApigenerator");

const router = express.Router();

router.get("/generate", generateStory);

module.exports = router;
