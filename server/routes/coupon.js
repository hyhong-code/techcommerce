const router = require("express").Router();
const { createCoupon, listCoupons, deleteCoupon } = require("../controllers/coupon");

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const validate = require("../middlewares/validate");
const { createCouponValidators } = require("../utils/validatiors/coupon");

router.route("/:code").delete(auth, limitTo("admin"), deleteCoupon);
router
  .route("/")
  .get(auth, limitTo("admin"), listCoupons)
  .post(auth, limitTo("admin"), createCouponValidators, validate, createCoupon);

module.exports = router;
