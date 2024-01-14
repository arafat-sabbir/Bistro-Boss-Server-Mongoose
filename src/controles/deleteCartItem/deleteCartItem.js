const Cart = require("../../models/cart");

const deleteCartItem = async(req,res)=>{
    const id = req.params.id;
    const query = {_id:id}
    const result = await Cart.deleteOne(query)
    res.send(result)
}

module.exports = deleteCartItem;