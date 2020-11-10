const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res, next) => {
  try {
    const { paymentIntent } = req.body;

    // Handle cart not found
    const cart = await Cart.findOne({ userId: req.user._id }).lean();
    if (!cart) {
      return res
        .status(404)
        .json({ errors: [{ msg: "User's cart not found." }] });
    }

    console.log("cart --->", cart);

    // Create order
    const order = await Order.create({
      products: cart.products, // Copy items in cart to order
      paymentIntent,
      orderedBy: req.user._id,
    });

    console.log("order --->", order);

    res.status(201).json({ order });
  } catch (error) {
    console.error("[❌ createOrder ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
