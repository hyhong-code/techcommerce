const { body } = require("express-validator");

exports.createCouponValidators = [
  body("code")
    .isLength({ min: 6, max: 12 })
    .withMessage("Name must be between 6 and 12 characters in length."),
  body("expiry").not().isEmpty().withMessage("An expiry data is required."),
  body("discount")
    .isNumeric()
    .custom((v) => Number(v) > 0)
    .withMessage("Discount must be a positive number."),
];
