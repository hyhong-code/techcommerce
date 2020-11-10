const router = require("express").Router();

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const { createPaymenIntent } = require("../controllers/stripe");

router.route("/").get(auth, limitTo("subscriber"), createPaymenIntent);

module.exports = router;
