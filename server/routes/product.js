const router = require("express").Router();

const {
  createProduct,
  listProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  updateRating,
  listSimilarProducts,
} = require("../controllers/products");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const {
  createValidators,
  updateValidators,
  updateRatingValidators,
} = require("../utils/validatiors/product");
const validate = require("../middlewares/validate");

router
  .route("/ratings/:slug")
  .put(auth, updateRatingValidators, validate, updateRating);

router.route("/similar/:slug").get(listSimilarProducts);

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
