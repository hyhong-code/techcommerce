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
      ],
      required: true,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
