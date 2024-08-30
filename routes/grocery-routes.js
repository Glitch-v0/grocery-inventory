const express = require("express");

const router = express.Router();
const groceryController = require("../controllers/grocery-controller");

router.get("/", groceryController.getGroceryList);
router.get("/:id", groceryController.getGroceryItem);
// router.post("/", groceryController.addGroceryItem);
// router.post("/:id", groceryController.updateGroceryItem);
// router.delete("/:id", groceryController.deleteGroceryItem);

module.exports = router;