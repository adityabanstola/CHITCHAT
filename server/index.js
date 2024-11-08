const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./database/db");
const cloudinary = require("cloudinary");

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
