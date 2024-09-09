const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');

router.get('/', itemController.getItems);
// router.post("/", itemController.addItem);
router.get('/:id', itemController.getItemDetails);
//router.put('/:id', itemController.updateItem);
//router.delete("/:id", itemController.deleteItem);

module.exports = router;
