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

router.route("/wishlist").post(auth, limitTo("subscriber"), addToWishlist);
router.route("/wishlist/:id", auth, limitTo("subscriber"), deleteWishlistItem);
router.route("/is-admin").get(auth, limitTo("admin"), isAdmin);
router.route("/").get(auth, loadUser).put(auth, updateUser);

module.exports = router;
