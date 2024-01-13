const { Schema, model } = require("mongoose");

const AllUserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
},{collection:"users"})

const User = model("users",AllUserSchema)

module.exports = User;