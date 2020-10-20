const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      default: "subscriber",
      enum: ["subscriber", "admin"],
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    // wishlist: {
    //   type: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
