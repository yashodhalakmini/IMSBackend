const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/add", userController.adduser);
router.post("/search", userController.searchUser);

module.exports = router;