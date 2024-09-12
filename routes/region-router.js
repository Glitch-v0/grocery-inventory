const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth");
const regionController = require("../controllers/region-controller");

router.get("/", regionController.getRegions);
router.post("/", regionController.addRegion);
router.post(
  "/:id",
  authorization.checkAdminStatus,
  regionController.updateRegion,
);
router.post(
  "/:id/delete",
  authorization.checkAdminStatus,
  regionController.deleteRegion,
);

module.exports = router;
