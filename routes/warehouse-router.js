const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse-controller');

router.get('/', warehouseController.getWarehouses);
//router.post('/', warehouseController.addNewWarehouse);
//router.put('/:id', warehouseController.updateWarehouse);
//router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;