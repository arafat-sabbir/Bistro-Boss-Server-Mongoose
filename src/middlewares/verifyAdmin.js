const User = require("../models/users");

const verifyAdmin  = async(req,res)=>{
    const email = req.decoded.email;
    const query = {email:email}
    const user = await User.findOne(query)
    console.log(user);
    const isAdmin = user.role==='admin';
    if(!isAdmin){
        return res.status(403).send({message:"Forbidden Access"})
    }
    next()
}


module.exports = verifyAdmin;