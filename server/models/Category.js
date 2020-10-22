const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Make slugs for category names
categorySchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
