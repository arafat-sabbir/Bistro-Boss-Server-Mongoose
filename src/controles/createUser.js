const User = require("../models/users");

const createUser = async(req,res)=>{
    const userData = req.body;
    const result = await User.create(userData)
    res.send(result)
}

module.exports = createUser;