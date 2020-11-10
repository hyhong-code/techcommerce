const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

/**
 * Create an order
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { paymentIntent } = req.body;

    // Handle cart not found
    const cart = await Cart.findOne({ userId: req.user._id }).lean();
    if (!cart) {
      return res.status(404).json({ errors: [{ msg: "User's cart not found." }] });
    }

    // Create order
    let order = await Order.create({
      products: cart.products, // Copy items in cart to order
      paymentIntent,
      orderedBy: req.user._id,
    });

    // Populte product info
    order = await order
      .populate({
        path: "products.product",
        select: "-color -__v",
      })
      .execPopulate();

    // Decrement quantity, increment sold
    const bulkWriteOps = cart.products.map((item) => ({
      updateOne: {
        filter: {
          _id: item.product._id,
        },
        update: {
          $inc: { quantity: -item.count, sold: +item.count },
        },
      },
    }));

    // MongoDB bulkwrite
    const updates = await Product.bulkWrite(bulkWriteOps);
    console.log("bulkwrite results --->", updates);

    res.status(201).json({ order });
  } catch (error) {
    console.error("[❌ createOrder ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

/**
 * List orders of a user
 */
exports.listUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ orderedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("[❌ listUserOrders ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

/**
 * List all orders for admin
 */
exports.listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("[❌ listOrders ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
