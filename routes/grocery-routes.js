const express = require('express');

const router = express.Router();
const groceryController = require('../controllers/grocery-controller');

router.get('/', (req, res) => {
  res.redirect('/items');
});
router.get('/items', groceryController.getGroceryList);
// router.post("/items", groceryController.addItem);
router.get('/items/:id', groceryController.getGroceryItem);
//router.put('/items/:id', groceryController.updateItem);
//router.delete(/items/:id", groceryController.deleteGroceryItem);

router.get('/categories', groceryController.getCategories);
router.post('/categories', groceryController.addNewCategory);
//router.put('/categories/:id', groceryController.updateCategory);
//router.delete('/categories/:id', groceryController.deleteCategory);

router.get('/warehouses', groceryController.getWarehouses);
//router.post('/warehouses', groceryController.addNewWarehouse);
//router.put('/warehouses/:id', groceryController.updateWarehouse);
//router.delete('/warehouses/:id', groceryController.deleteWarehouse);

router.get('/*', (req, res) => {
  res.render('error', { errorCode: 404, errorMessage: 'Invalid Page' });
});

module.exports = router;
