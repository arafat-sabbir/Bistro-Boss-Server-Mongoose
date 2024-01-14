const express = require('express');
const router = express.Router();
const getAllUses = require("../controles/getalluser");
const getSingleUser = require('../controles/getsingleuser');
const deleteSingleUser = require('../controles/deleteSingleuser');
const createUser = require('../controles/createUser');
const updateUser = require('../controles/updateUser');
const isUserAdmin = require('../controles/findisAdmin/isUserAdmin');

router.get("/get-all-users",getAllUses)

router.get('/get-single-user',getSingleUser)

router.get("/user/admin/:email",isUserAdmin)

router.delete('/delete-user',deleteSingleUser)

router.post('/users',createUser)

router.patch('/updateUser/:email',updateUser)

module.exports = router;