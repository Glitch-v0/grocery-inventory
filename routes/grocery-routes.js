const express = require("express");

const router = express.Router();
const groceryController = require("../controllers/grocery-controller");

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/items", groceryController.getGroceryList);
router.get("/items/:id", groceryController.getGroceryItem);
router.get("/categories", groceryController.getCategories);
router.get("/warehouses", groceryController.getWarehouses)
router.get("/*", (req, res) => {
    res.render("error", {errorCode: 404, errorMessage: "Invalid Page"});
});
// router.post("/", groceryController.addGroceryItem);
// router.post("/:id", groceryController.updateGroceryItem);
// router.delete("/:id", groceryController.deleteGroceryItem);

module.exports = router;