const express = require("express");
const createToken = require("../../controles/CreateToken/createToken");
const router = express.Router();

router.post("/user/accessToken",createToken)

module.exports = router;