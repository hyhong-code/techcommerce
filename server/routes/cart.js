const router = require("express").Router();

const { upsertCart } = require("../controllers/cart");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const validate = require("../middlewares/validate");
const { upsertValidators } = require("../utils/validatiors/cart");

router
  .route("/")
  .put(auth, upsertValidators, validate, limitTo("subscriber"), upsertCart);

module.exports = router;
