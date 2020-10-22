const { body } = require("express-validator");

const common = [
  body("name")
    .isLength({ min: 2, max: 32 })
    .withMessage("Sub category name must be between 2 and 32 characters long."),
];

exports.createValidator = [...common];

exports.updateValidator = [...common];
