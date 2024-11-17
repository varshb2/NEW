require("dotenv").config(); // Add this at the top of the file

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Use the JWT secret from your .env file

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
