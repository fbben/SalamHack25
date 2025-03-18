const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { saltRounds } = require("../utils/globals");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: username, email, and password are required.",
      });
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Validate password length (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // Validate username length (minimum 3 characters)
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long.",
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      // Identify which field is duplicated
      let errorMessage = "Username or Email already exists.";
      if (existingUser.username === username && existingUser.email === email) {
        errorMessage = "Both username and email are already in use.";
      } else if (existingUser.username === username) {
        errorMessage = "Username already exists.";
      } else if (existingUser.email === email) {
        errorMessage = "Email already exists.";
      }
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    // Hash the user's password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (hashError) {
      console.error("Password hashing error:", hashError);
      return res.status(500).json({
        success: false,
        message: "Internal server error during password processing.",
      });
    }

    // Create a new user instance with the hashed password
    const newUser = new User({
      username,
      email,
      password_hash: hashedPassword,
    });

    // Save the user to the database
    try {
      await newUser.save();
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      if (saveError.name === "ValidationError") {
        const messages = Object.values(saveError.errors).map(
          (val) => val.message
        );
        return res.status(400).json({
          success: false,
          message: "Validation error: " + messages.join(", "),
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error while saving the user.",
      });
    }

    // Generate a JWT token for the new user
    let token;
    try {
      token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
    } catch (tokenError) {
      console.error("JWT token generation error:", tokenError);
      return res.status(500).json({
        success: false,
        message: "Internal server error during token generation.",
      });
    }

    // Return a successful response with user data and token
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.error("General signup error:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

const login = async (req, res, next) => {
  try {
    // Accept either an email or username as identifier
    const { identifier, password } = req.body;

    // Validate required fields
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Identifier (email or username) and password are required.",
      });
    }

    // Determine if the identifier is an email or a username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let user;
    if (emailRegex.test(identifier)) {
      // If identifier is an email, look up by email
      user = await User.findOne({ email: identifier });
    } else {
      // Otherwise, treat it as a username
      user = await User.findOne({ username: identifier });
    }

    // If no user is found, respond with invalid credentials
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials: user not found.",
      });
    }

    // Compare the provided password with the stored hashed password
    let isMatch;
    try {
      isMatch = await bcrypt.compare(password, user.password_hash);
    } catch (compareError) {
      console.error("Error comparing passwords:", compareError);
      return res.status(500).json({
        success: false,
        message: "Internal server error during password verification.",
      });
    }

    // If password does not match, respond with an error
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials: incorrect password.",
      });
    }

    // Generate a JWT token for the authenticated user
    let token;
    try {
      token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
    } catch (tokenError) {
      console.error("JWT token generation error:", tokenError);
      return res.status(500).json({
        success: false,
        message: "Internal server error during token generation.",
      });
    }

    // Successful login response with token and user data
    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("General login error:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login.",
    });
  }
};


module.exports = {
  signup,
  login,
};
