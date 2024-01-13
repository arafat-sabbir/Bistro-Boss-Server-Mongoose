const User = require("../models/users");

const updateUser = async(req,res)=>{
    const email = req.params.email;
    const query = {email:email}
    const updatedDoc = {
        $set:{
            role:req.body.role
        }
    }
    const result  = await User.findOneAndUpdate(query,updatedDoc,{ new: true })
    res.send(result)

}

module.exports = updateUser;