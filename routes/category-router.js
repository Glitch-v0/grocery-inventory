const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.addNewCategory);
router.post('/:id/update', categoryController.updateCategory);
router.post('/:id', categoryController.deleteCategory);

module.exports = router;