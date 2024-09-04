const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');

router.get('/', itemController.getGroceryList);
// router.post("/", itemController.addItem);
router.get('/:id', itemController.getGroceryItem);
//router.put('/:id', itemController.updateItem);
//router.delete("/:id", itemController.deleteGroceryItem);

module.exports = router;
