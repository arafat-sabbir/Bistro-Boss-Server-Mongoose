const verifyToken = require("../../middlewares/verifyToken");

const adminVerify = async(req,res)=>{
    const email = req.params.email;
    console.log(`getting admin verify email from params   ${email}`);
    verifyToken(req,res,async()=>{
        try{
            console.log("getting decoded email",req.decoded.email);
            if(email !==req.decoded.email){
                res.status(403).send({message:"Forbidden Access"})

            }
        }catch(error){
            res.status(500).send({message:"Internal Server Error"})
    }
    })
}

module.exports = adminVerify;