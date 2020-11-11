const { body } = require("express-validator");

exports.wishlistValidators = [body("id").not().isEmpty().withMessage("id is required.")];
