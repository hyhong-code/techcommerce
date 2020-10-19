const router = require("express").Router();

const { createUpdateUser } = require("../controllers/user");

const auth = require("../middlewares/auth");

router.route("/").post(auth, createUpdateUser);

module.exports = router;
