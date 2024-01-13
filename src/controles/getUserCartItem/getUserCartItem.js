const Cart = require("../../models/cart");

const getUserCartItem = async(req,res)=>{
    const email = req.query.email;
    const query = {userEmail:email}
    const result = await Cart.find(query)
    res.send(result)
}

module.exports = getUserCartItem;