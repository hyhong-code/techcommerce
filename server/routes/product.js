const router = require("express").Router();

const { createProduct, listProducts } = require("../controllers/products");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const { createValidators } = require("../utils/validatiors/product");
const validate = require("../middlewares/validate");

router
  .route("/")
  .get(listProducts)
  .post(auth, limitTo("admin"), createValidators, validate, createProduct);

module.exports = router;
