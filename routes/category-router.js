const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.addNewCategory);
router.post('/update/:id', categoryController.updateCategory);
//router.delete('/:id', categoryController.deleteCategory);

module.exports = router;