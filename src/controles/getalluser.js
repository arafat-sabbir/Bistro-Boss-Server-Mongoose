const User = require("../models/users")

const getAllUses = async(req,res)=>{
    try {
        const result = await User.find();
        res.send(result);
      } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
} 

module.exports = getAllUses;