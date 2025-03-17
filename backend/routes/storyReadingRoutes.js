const { Router } = require("express");

const getStoryReadingById = require("../controllers/storyReadingController");

const router = Router();

router.get("/:id", getStoryReadingById);

module.exports = router;