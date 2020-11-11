const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
            min: 1,
          },
          color: {
            type: String,
            required: true,
            enum: ["Black", "Brown", "Silver", "White", "Blue"],
          },
        },
      ],
      required: true,
    },
    paymentIntent: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
        "Cash on delivery",
      ],
      required: true,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Populte product object opon query
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.product",
    select: "-color -_v",
  });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
