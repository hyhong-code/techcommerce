const router = require("express").Router({ mergeParams: true });

const {
  createSub,
  getSub,
  updateSub,
  deleteSub,
  listSubs,
} = require("../controllers/subs");
const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const validate = require("../middlewares/validate");
const {
  createValidator,
  updateValidator,
} = require("../utils/validatiors/sub");

router
  .route("/:slug")
  .get(getSub)
  .put(auth, limitTo("admin"), updateValidator, validate, updateSub)
  .delete(auth, limitTo("admin"), deleteSub);
router
  .route("/")
  .get(listSubs)
  .post(auth, limitTo("admin"), createValidator, validate, createSub);

module.exports = router;
