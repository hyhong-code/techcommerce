const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      default: "subscriber",
      enum: ["subscriber", "admin"],
    },
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Product", required: true }],
      default: [],
    },
  },
  { timestamps: true }
);

// Populte wishlist products upon query
UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "wishlist",
  });
  next();
});

module.exports = mongoose.model("User", UserSchema);
