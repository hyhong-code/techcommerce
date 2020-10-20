const { body, param } = require("express-validator");

const common = [
  body("name")
    .isLength({ min: 2, max: 32 })
    .withMessage("Category name must be between 2 and 32 characters long."),
];

exports.createValidator = [...common];

exports.updateValidator = [...common];
