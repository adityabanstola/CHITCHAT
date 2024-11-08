const User = require("../models/userModel");
const { getDataUrl } = require("../utils/urlGenerator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const generateToken = require("../utils/generateToken");
const Trycatch = require("../utils/Trycatch");

// Register User
const registerUser = Trycatch(async (req, res) => {
  // Destructure fields from request body
  const { email, password, Username, gender } = req.body;
  const file = req.file; // This will contain the uploaded file

  // Check if all required fields are provided
  if (!Username || !email || !password || !gender || !file) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }

  // Check if the user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Convert file to Data URL
  const fileUrl = getDataUrl(file);

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Upload image to Cloudinary
  const myCLoud = await cloudinary.v2.uploader.upload(fileUrl.content);

  // Create new user
  user = new User({
    email,
    password: hashPassword,
    Username,
    gender,
    profilePic: {
      id: myCLoud.public_id,
      url: myCLoud.secure_url,
    },
  });

  // Save user to database
  await user.save();

  // Generate token for the user
  generateToken(user._id, res);

  res.status(201).json({ message: "User created successfully" });
});

// Login User
const loginUser = Trycatch(async (req, res) => {
  const { email, password } = req.body;
});

module.exports = { registerUser, loginUser };
