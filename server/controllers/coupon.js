const Coupon = require("../models/Coupon");

exports.createCoupon = async (req, res, next) => {
  try {
    const { code, expiry } = req.body;

    // Handle coupon code already in use
    let coupon = await Coupon.findOne({ code });
    if (coupon) {
      return res.status(400).json({ errors: [{ msg: `Coupon code ${code} is already in use.` }] });
    }

    // Handle coupon code expired
    if (Number(expiry) < Date.now()) {
      return res.status(400).json({ errors: [{ msg: `Coupon code ${code} is already expired.` }] });
    }

    // Create coupon
    coupon = await Coupon.create(req.body);
    res.status(201).json({ coupon });
  } catch (error) {
    console.error("[❌ createCoupon ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Handle coupon code not found
    let coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ errors: [{ msg: `Coupon code ${code} not found.` }] });
    }

    // Delete coupon
    await Coupon.findOneAndDelete({ code });
    res.status(200).json({ msg: `Coupon code ${code} has been deleted.` });
  } catch (error) {
    console.error("[❌ deleteCoupon ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.listCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({});
    return res.status(200).json({ coupons });
  } catch (error) {
    console.error("[❌ listCoupons ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
