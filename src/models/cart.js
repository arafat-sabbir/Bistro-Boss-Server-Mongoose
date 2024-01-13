const { Schema, model } = require("mongoose");

const AllCartSchema = new Schema({
  userEmail: {
    type: String,
    require: true,
  },
  foodid: {
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
},{collation:'carts'});

const Cart = model('carts',AllCartSchema)
module.exports = Cart;
