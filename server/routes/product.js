const router = require("express").Router();

const { createProduct } = require("../controllers/product");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");

router.route("/").post(auth, limitTo("admin"), createProduct);

module.exports = router;
