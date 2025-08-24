const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = async (req, res, next) => {
  const token = req.cookies.token;  
  if (!token) {
    return res.status(400).json({ message: "Not Authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SUPER_KEY);    
    req.user = decoded;    
    next();
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { middleware };
