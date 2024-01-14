const User = require("../models/users");

const createUser = async(req,res)=>{
    const userData = req.body;
    const email = req.body.email
    const query = {email:email}
    const isUserExist = await User.findOne(query)
    if(isUserExist){
      return  res.send({message:"user Already Exist"})
    }
    const result = await User.create(userData)
    res.send(result)
}

module.exports = createUser;