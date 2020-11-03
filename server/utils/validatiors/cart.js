const { body } = require("express-validator");

exports.upsertValidators = [
  body("cart")
    .custom((cart) => cart && Object.keys(cart).length > 0)
    .withMessage("Cart must contain at least one product."),
];
