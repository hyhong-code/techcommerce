const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");

exports.upsertCart = async (req, res, next) => {
  try {
    const { cart } = req.body;

    // Find products in cart from DB
    let products = await Product.find({
      _id: { $in: Object.keys(cart) },
    }).lean();

    // Handle products are not valid
    if (!Object.keys(cart).every((pid) => !!products.find((p) => p._id.toString() === pid))) {
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
        cartTotal: products.reduce((acc, cur) => acc + cur.price * cur.count, 0).toFixed(2),
      },
      { upsert: true, runValidators: true, new: true }
    );

    res.status(200).json({ cart: upsertedCart });
  } catch (error) {
    console.error("[❌ upsertCart ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({
      userId: req.user._id,
    }).lean();

    // Handle user has no cart
    if (!cart) {
      return res.status(404).json({ errors: [{ msg: "Cart not found." }] });
    }

    // Formate products into an object
    const { products, cartTotal, totalAfterDiscount } = cart;
    res.status(200).json({
      products: products
        .map((p) => {
          const { product, ...rest } = p;
          const { _id, ...restWOId } = rest;
          return { ...product, ...restWOId };
        })
        .reduce((acc, cur) => {
          acc[cur._id] = cur;
          return acc;
        }, {}),
      cartTotal,
      totalAfterDiscount,
    });
  } catch (error) {
    console.error("[❌ getCart ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.removeCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.status(200).json({
      success: true,
      message: "Cart deleted.",
    });
  } catch (error) {
    console.error("[❌ removeCart ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.applyCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.body;

    // Handle coupon not found
    const coupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase() });
    if (!coupon) {
      return res.status(404).json({ errors: [{ msg: `Coupon code ${couponCode} is invalid.` }] });
    }

    // Handle coupon expired.
    if (Date.parse(coupon.expiry) < Date.now()) {
      return res.status(400).json({ errors: [{ msg: `Coupon code ${couponCode} is expired.` }] });
    }

    // Handle no shopping cart found
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ errors: [{ msg: `Cart not found.` }] });
    }

    // Apply coupon
    cart.cartTotal -= Number(coupon.discount);
    cart = await cart.save({ validateBeforeSave: true });

    res.status(200).json({ cart });
  } catch (error) {
    console.error("[❌ applyDiscount ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
