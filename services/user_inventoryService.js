const express = require("express");
const inventoryController = require("../controllers/inventory-controller");

const router = express.Router();

//api call for creating a inventory
router.post("/", inventoryController.addinventory);

//api call for getting the list of inventories of the system
router.get("/",inventoryController.getinventories);

// api call for getting a single inventory of the system
router.get("/:id",inventoryController.getinventory);

//api call for updating a inventory
router.put("/:id", inventoryController.updateinventory);

router.get("/items/:status", inventoryController.statusinventory );
// router.get("/:status",function(req,res,next){
//    var status= req.params.status;
//    item.f({status:status})
// });

module.exports = router;