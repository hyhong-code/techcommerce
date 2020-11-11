const { body } = require("express-validator");

const STATUS_OPTIONS = [
  "Not processed",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Completed",
  "Cash on delivery",
];

exports.createOrderValidators = [
  body("paymentIntent")
    .not()
    .isEmpty()
    .withMessage("Payment intent is required."),
];

exports.updateStatusValidators = [
  body("orderStatus")
    .not()
    .isEmpty()
    .custom((v) => STATUS_OPTIONS.includes(v))
    .withMessage(
      `Status is required and must be one of ${STATUS_OPTIONS.join(", ")}.`
    ),
];
