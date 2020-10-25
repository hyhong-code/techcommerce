const router = require("express").Router();

const {
  createProduct,
  listProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require("../controllers/products");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const {
  createValidators,
  updateValidators,
} = require("../utils/validatiors/product");
const validate = require("../middlewares/validate");

router
  .route("/:slug")
  .get(getProduct)
  .put(auth, limitTo("admin"), updateValidators, validate, updateProduct)
  .delete(auth, limitTo("admin"), deleteProduct);
router
  .route("/")
  .get(listProducts)
  .post(auth, limitTo("admin"), createValidators, validate, createProduct);

module.exports = router;
