const express = require('express');
const router = express.Router();
const regionController = require('../controllers/region-controller');

router.get('/', regionController.getRegions);
router.post('/', regionController.addNewregion);
router.post('/:id', regionController.updateRegion);
router.post('/:id/delete', regionController.deleteRegion);

module.exports = router;