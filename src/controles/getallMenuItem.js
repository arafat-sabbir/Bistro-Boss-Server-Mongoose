const Menu = require("../models/menu")

const getAllMenuItem = async(req,res)=>{
    const result = await Menu.find()
    res.send(result)
}
module.exports = getAllMenuItem;