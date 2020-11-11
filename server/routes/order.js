const router = require("express").Router();

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const {
  createOrder,
  listUserOrders,
  listOrders,
  updateOrderStatus,
  createCashOrder,
} = require("../controllers/order");
const {
  createOrderValidators,
  updateStatusValidators,
} = require("../utils/validatiors/order");
const validate = require("../middlewares/validate");

router.route("/me").get(auth, limitTo("subscriber"), listUserOrders);
router
  .route("/:id")
  .put(
    auth,
    limitTo("admin"),
    updateStatusValidators,
    validate,
    updateOrderStatus
  );
router.route("/cash").post(auth, limitTo("subscriber"), createCashOrder);
router
  .route("/")
  .get(auth, limitTo("admin"), listOrders)
  .post(
    auth,
    limitTo("subscriber"),
    createOrderValidators,
    validate,
    createOrder
  );

module.exports = router;
