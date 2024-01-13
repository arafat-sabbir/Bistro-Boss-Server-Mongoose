const Cart = require("../models/cart");

const addToCart = async(req,res)=>{
    const foodData = req.body;
    const result = await Cart.create(foodData)
    res.send(result)
}
module.exports = addToCart;