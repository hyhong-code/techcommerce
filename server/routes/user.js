const router = require("express").Router();

const { loadUser, isAdmin } = require("../controllers/user");

const auth = require("../middlewares/auth");

router.route("/").get(auth, loadUser);
router.route("/admin").get(auth, isAdmin);

module.exports = router;
