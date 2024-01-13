const express = require('express');
const getAllMenuItem = require('../controles/getallMenuItem');
const router = express.Router();

router.get('/menu',getAllMenuItem)

module.exports = router;