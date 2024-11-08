const multer = require("multer");

const storage = multer.memoryStorage(); // Storing files in memory

const uploadFile = multer({ storage }).single("file"); // Use "file" for the form field name

module.exports = uploadFile; // Use CommonJS syntax
