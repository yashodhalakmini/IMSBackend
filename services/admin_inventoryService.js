const express = require("express");
const inventoryController = require("../controllers/inventory-controller");

const router = express.Router();

//api call for creating a inventory
router.post("/", inventoryController.addinventory);

//api call for getting the list of inventories of the system
router.get("/",inventoryController.getinventories);

// api call for getting a single inventory of the system
router.get("/:id",inventoryController.getinventory);

//api call for removing a inventory
router.delete("/:id", inventoryController.deleteinventory);

//api call for updating a inventory
router.put("/:id", inventoryController.updateinventory);




module.exports = router;