const express = require("express");
const router = express.Router();
require('dotenv').config();

const Controller = require('../Controller/User.controller');

//Rutas
router.post("/login", Controller.getUser);

router.post("/createUser", Controller.addUser);

module.exports = router;