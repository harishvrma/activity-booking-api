const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request object
    req.user = decoded;   // This assumes `decoded` contains the user ID

    next();  // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
