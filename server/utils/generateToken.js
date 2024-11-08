const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  res.cookie("token", token, {
    maxAge: 4 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
module.exports = generateToken;
