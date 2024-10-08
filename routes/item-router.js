const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item-controller");
const authorization = require("../middleware/auth");

router.get("/", itemController.getItems);
router.post("/", itemController.addItem);
router.get("/:id", itemController.getItemDetails);
router.post(
  "/:id/update",
  authorization.checkAdminStatus,
  itemController.updateItem,
);
router.post(
  "/:id/delete",
  authorization.checkAdminStatus,
  itemController.deleteItem,
);

module.exports = router;
