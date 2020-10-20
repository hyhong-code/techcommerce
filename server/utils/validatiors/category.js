const { body, param } = require("express-validator");

exports.createValidator = [
  body("name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Category name must be between 3 and 32 characters long."),
];
