const express = require("express");
const router = express.Router();
const authMiddleware = require('../src/middleware/middleware');
const { getAllStories } = require("../controllers/libraryControler");

router.get("/stories",authMiddleware, getAllStories);

module.exports = router;