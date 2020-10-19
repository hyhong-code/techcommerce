const router = require("express").Router();

const { createUpdateUser } = require("../controllers/user");

router.route("/").get(createUpdateUser);

module.exports = router;
