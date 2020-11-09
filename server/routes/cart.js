const router = require("express").Router();

const { upsertCart, getCart, removeCart, applyCoupon } = require("../controllers/cart");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const validate = require("../middlewares/validate");
const { upsertValidators } = require("../utils/validatiors/cart");

router.route("/coupon").put(auth, limitTo("subscriber"), applyCoupon);
router
  .route("/")
  .get(auth, limitTo("subscriber"), getCart)
  .put(auth, limitTo("subscriber"), upsertValidators, validate, upsertCart)
  .delete(auth, limitTo("subscriber"), removeCart);

module.exports = router;
