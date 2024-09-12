const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth");
const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.getCategories);
router.post("/", categoryController.addCategory);
router.post(
  "/:id/update",
  authorization.checkAdminStatus,
  categoryController.updateCategory,
);
router.post(
  "/:id",
  authorization.checkAdminStatus,
  categoryController.deleteCategory,
);

module.exports = router;
