const express = require("express");
const router = express.Router();
const uploadFile = require("../middleware/multer");

const { registerUser } = require("../controller/authController"); // Correct the typo here

router.post("/register", uploadFile, registerUser); // Correct function name here

module.exports = router;
