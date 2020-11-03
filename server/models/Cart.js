import mongoose from "mongoose";

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
      required: true,
      validate: (v) => v >= 0,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Fill cart total before validation
cartSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("products")) {
    this.cartTotal = this.products.map((p) => (p.price * p.count).toFixed(2));
  }
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
