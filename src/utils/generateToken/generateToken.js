const jwt = require('jsonwebtoken');
require('dotenv').config()
const generateToken = (user)=>{
    return jwt.sign(user,process.env.TOKEN_SECRET,{
    expiresIn:'1hr'
    })
}

module.exports = generateToken;