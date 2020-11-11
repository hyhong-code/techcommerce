const router = require("express").Router();

const {
  loadUser,
  isAdmin,
  updateUser,
  addToWishlist,
  deleteWishlistItem,
} = require("../controllers/user");

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const validate = require("../middlewares/validate");
const { wishlistValidators } = require("../utils/validatiors/user");

router.route("/wishlist/:id").delete(auth, limitTo("subscriber"), deleteWishlistItem);
router
  .route("/wishlist")
  .post(auth, limitTo("subscriber"), wishlistValidators, validate, addToWishlist);

router.route("/is-admin").get(auth, limitTo("admin"), isAdmin);
router.route("/").get(auth, loadUser).put(auth, updateUser);

module.exports = router;
