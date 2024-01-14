const express = require("express");
const addToCart = require("../../controles/AddToCart/addToCart");
const getUserCartItem = require("../../controles/getUserCartItem/getUserCartItem");
const deleteCartItem = require("../../controles/deleteCartItem/deleteCartItem");
const router = express.Router();

router.post("/addToCart", addToCart);

router.get("/carts",getUserCartItem);

router.delete("/carts/:id",deleteCartItem)

module.exports = router;
