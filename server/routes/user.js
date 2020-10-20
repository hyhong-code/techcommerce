const router = require("express").Router();

const { loadUser, isAdmin } = require("../controllers/user");

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");

router.route("/").get(auth, loadUser);
router.route("/is-admin").get(auth, limitTo("admin"), isAdmin);

module.exports = router;
