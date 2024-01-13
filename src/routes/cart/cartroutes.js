const express = require("express");
const addToCart = require("../../controles/AddToCart/addToCart");
const getUserCartItem = require("../../controles/getUserCartItem/getUserCartItem");
const router = express.Router();

router.post("/addToCart", addToCart);

router.get("/carts",getUserCartItem);

module.exports = router;
