const express = require("express");
const authController = require("../controllers/authentciation-controller");
var User = require("../models.js/user");

const router = express.Router();


router.post("/login",authController.authenticateUsers);




module.exports = router;