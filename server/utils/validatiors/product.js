const { body } = require("express-validator");

exports.createValidators = [
  body("title")
    .not()
    .isEmpty()
    .isLength({ max: 32 })
    .withMessage(
      "A title is required and msut be less than 32 characters long."
    ),
  body("description")
    .not()
    .isEmpty()
    .isLength({ max: 2000 })
    .withMessage(
      "A description is required and msut be less than 2000 characters long."
    ),
  body("price").not().isEmpty().withMessage("A price is required."),
  body("category").not().isEmpty().withMessage("A category is required."),
  body("subs")
    .custom((subsArray) => subsArray instanceof Array && subsArray.length > 0)
    .withMessage("At least one sub category is required."),
  body("quantity").not().isEmpty().withMessage("A quantity is required."),
  body("images")
    .custom(
      (imagesArray) => imagesArray instanceof Array && imagesArray.length > 0
    )
    .withMessage("At least an image is required."),
  body("color").not().isEmpty().withMessage("A color is required."),
  body("brand").not().isEmpty().withMessage("A brand is required."),
];
