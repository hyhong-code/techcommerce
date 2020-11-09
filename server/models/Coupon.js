const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "A code is required."],
      trim: true,
      unique: true,
      uppercase: true,
      minlength: [6, "A code is at least 6 characters."],
      maxlength: [12, "A code is at least 12 characters."],
      index: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => Number(v) > 0,
        message: "Discount must be a positive number.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
