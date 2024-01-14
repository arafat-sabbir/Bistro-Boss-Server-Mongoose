const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifyToken = (req,res,next)=>{
    console.log("token from the middleware", req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Unauthorized Access Request" });
    }
    const token = req?.headers?.authorization?.split(" ")[1];
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized access Detected" });
      }
      req.user = decoded;
      next();
    });
}

module.exports = verifyToken;