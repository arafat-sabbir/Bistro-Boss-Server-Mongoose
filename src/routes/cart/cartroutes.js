const express = require("express");
const addToCart = require("../../AddToCart/addToCart");
const router = express.Router();


router.post('/addToCart',addToCart)

module.exports = router;