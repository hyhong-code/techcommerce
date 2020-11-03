const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
          },
          count: {
            type: Number,
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
            validate: (v) => v >= 0,
          },
        },
      ],
      required: true,
    },
    cartTotal: {
      type: Number,
      required: true,
      validate: (v) => v >= 0,
    },
    totalAfterDiscount: {
      type: Number,
      validate: (v) => v >= 0,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
