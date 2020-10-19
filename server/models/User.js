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
      default: "subscriber",
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

module.exoprts = mongoose.model("User", UserSchema);
