const { Router } = require("express");
const router = Router();

const { getProfile } = require("../controllers/users")

require("dotenv").config();

// Handling get request
router.get("/profile", getProfile);

module.exports = router;