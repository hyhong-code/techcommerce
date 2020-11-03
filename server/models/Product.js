const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Sub",
        required: true,
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        key: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    shipping: { type: Boolean },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    },
    ratings: {
      type: [
        {
          star: {
            type: Number,
            required: true,
          },
          postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        },
      ],
      default: [],
    },
    // avgStars: {
    //   type: Number,
    //   default: 0.5,
    // },
  },
  { timestamps: true }
);

// Generate slug for product before validation
productSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

// Populate category and subs
productSchema.pre(/^find/, function (next) {
  this.populate("category subs");
  next();
});

// Modify the avgStars field whenver a new ratings gets added / modified
// productSchema.pre("save", function (next) {
//   if (this.isNew || this.isModified("ratings")) {
//     this.avgStars =
//       this.ratings.reduce((acc, rate) => acc + rate.star, 0) /
//       this.ratings.length;
//   }
//   next();
// });

module.exports = mongoose.model("Product", productSchema);
