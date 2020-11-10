const { body } = require("express-validator");

exports.createOrderValidators = [
  body("paymentIntent")
    .not()
    .isEmpty()
    .withMessage("Payment intent is required."),
];
