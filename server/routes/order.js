const router = require("express").Router();

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const { createOrder, listUserOrders, listOrders } = require("../controllers/order");
const { createOrderValidators } = require("../utils/validatiors/order");
const validate = require("../middlewares/validate");

router.route("/me").get(auth, limitTo("subscriber"), listUserOrders);
router
  .route("/")
  .get(auth, limitTo("admin"), listOrders)
  .post(auth, limitTo("subscriber"), createOrderValidators, validate, createOrder);

module.exports = router;
