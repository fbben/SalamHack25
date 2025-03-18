const { Router } = require("express");
const router = Router();

const { signup, login } = require("../controllers/auth")

require("dotenv").config();

// Handling post request
router.post("/signup", signup);

// Handling post request
router.post("/login", login);



module.exports = router;
