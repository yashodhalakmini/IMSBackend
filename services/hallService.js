const express = require("express");
const hallController = require("../controllers/hall-controller");

const router= express.Router();


//api call for creating a hall
router.post("/", hallController.addhall);

//api call for getting the list of halls of the system
router.get("/",hallController.gethalls);

// api call for getting a single hall of the system
router.get("/:id",hallController.gethall);

//api call for updating a inventory
router.put("/:id", hallController.updatehall);

//api call for updating a inventory
router.delete("/:id", hallController.deletehall);

module.exports = router;

