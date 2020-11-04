const router = require("express").Router();

const { upsertCart, getCart } = require("../controllers/cart");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const validate = require("../middlewares/validate");
const { upsertValidators } = require("../utils/validatiors/cart");

router
  .route("/")
  .get(auth, limitTo("subscriber"), getCart)
  .put(auth, limitTo("subscriber"), upsertValidators, validate, upsertCart);

module.exports = router;
