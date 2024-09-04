const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse-controller');

router.get('/', warehouseController.getWarehouses);
router.post('/', warehouseController.addNewWarehouse);
router.post('/:id', warehouseController.updateWarehouse);
router.post('/:id/delete', warehouseController.deleteWarehouse);

module.exports = router;