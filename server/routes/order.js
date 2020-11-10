const router = require("express").Router();

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const { createOrder } = require("../controllers/order");
const { createOrderValidators } = require("../utils/validatiors/order");
const validate = require("../middlewares/validate");

router
  .route("/")
  .post(
    auth,
    limitTo("subscriber"),
    createOrderValidators,
    validate,
    createOrder
  );

module.exports = router;
