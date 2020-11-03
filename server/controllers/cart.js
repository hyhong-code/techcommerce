const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.upsertCart = async (req, res, next) => {
  try {
    const { cart } = req.body;

    // Find products in cart from DB
    let products = await Product.find({
      _id: { $in: Object.keys(cart) },
    }).lean();

    // Handle products are not valid
    if (
      !Object.keys(cart).every(
        (pid) => !!products.find((p) => p._id.toString() === pid)
      )
    ) {
      return res.status(400).json({
        errors: [{ msg: "One or more products are invalid, try again later." }],
      });
    }

    // Shape the products for DB
    products = products.map((p) => ({
      product: p._id,
      count: cart[p._id].count,
      color: cart[p._id].color,
      price: p.price,
    }));

    // Create new cart or update cart
    upsertedCart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      {
        products,
        userId: req.user._id,
        cartTotal: products
          .reduce((acc, cur) => acc + cur.price * cur.count, 0)
          .toFixed(2),
      },
      { upsert: true, runValidators: true, new: true }
    );

    res.status(200).json({ cart: upsertedCart });
  } catch (error) {
    console.error("[❌ upsertCart ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
