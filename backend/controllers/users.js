const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const getProfile = async (req, res, next) => {
  try {
    // Retrieve the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing.",
      });
    }

    // Expecting the header format to be "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing from the Authorization header.",
      });
    }

    // Verify the token using your secret
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (tokenError) {
      console.error("Token verification error:", tokenError);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Extract userId from the decoded token (assuming you stored it during sign-up/login)
    const userId = decoded.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token payload: userId missing.",
      });
    }

    // Retrieve the user from the database, excluding sensitive fields like password_hash
    const user = await User.findById(userId).select("-password_hash");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Respond with the user profile data
    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the profile.",
    });
  }
};


module.exports = {
  getProfile,
};
