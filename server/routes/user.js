const router = require("express").Router();

const { loadUser } = require("../controllers/user");

const auth = require("../middlewares/auth");

router.route("/").get(auth, loadUser);

module.exports = router;
