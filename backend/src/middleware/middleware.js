const jwt = require("jsonwebtoken");
const UserModel = require ('../../models/user');

//retreive the authentified user email and put it to req.user
// before handling the request in next route hundler
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check if the token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access forbidden : Token not found !" });
  }
   // Extract  token
   const token = authHeader.split(" ")[1];
  try {
    // Decrypt Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.email) {
      return res.status(400).json({ message: "Invalid token: Email not found!" });
    }
    // always the result of decoding is an email
    req.user = decoded.email;
    // next route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token !" });
  }
};

module.exports = authMiddleware;
