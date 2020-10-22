const mongoose = require("mongoose");
const slugify = require("slugify");

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 32,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

// Make slugs for sub categories names
subSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

module.exports = mongoose.model("Sub", subSchema);
