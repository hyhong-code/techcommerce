const User = require("../models/User");
const Product = require("../models/Product");

exports.loadUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.isAdmin = async (req, res, next) => {
  res.status(200).json({ access: true });
};

exports.updateUser = async (req, res, next) => {
  try {
    // Prevent client from updating role and email
    const cleanBody = Object.entries(req.body).reduce((acc, [k, v]) => {
      if (!["role", "email"].includes(k)) {
        acc[k] = v;
      }
      return acc;
    }, {});

    // Update user
    const user = await User.findByIdAndUpdate(req.user._id, cleanBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error("[❌ updateUser ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Handle product not found
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ errors: [{ msg: "Product not found." }] });
    }

    // Handle duplicate product in wishlist
    let user = await User.findOne({ _id: req.user._id, wishlist: product._id });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: `${product.title} is already in your wishlist.` }] });
    }

    // Add product to user's wishlist
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: product._id } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    console.error("[❌ addToWishlist ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.deleteWishlistItem = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("[❌ deleteWishlistItem ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
