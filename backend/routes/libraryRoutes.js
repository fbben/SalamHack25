const express = require("express");
const router = express.Router();
const { getAllStories } = require("../controllers/libraryControler");

router.get("/stories", getAllStories);

module.exports = router;
