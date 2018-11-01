const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/add", userController.adduser);
router.post("/search", userController.searchUser);
router.delete("/delete", userController.deleteuser);
router.put("/update", userController.updateuser);

module.exports = router;