const router = require("express").Router();

const { createValidator } = require("../utils/validatiors/category");
const validate = require("../middlewares/validate");

const {
  listCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/cateogries");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");

router
  .route("/:slug")
  .get(getCategory)
  .put(auth, limitTo("admin"), updateCategory)
  .delete(auth, limitTo("admin"), deleteCategory);
router
  .route("/")
  .get(listCategories)
  .post(auth, limitTo("admin"), createValidator, validate, createCategory);

module.exports = router;
