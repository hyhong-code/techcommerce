const Category = require("../models/Categories");

exports.listCategories = async (req, res, next) => {};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Handle duplicate name
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        errors: [{ msg: `Category with name ${name} already exists.` }],
      });
    }

    category = await Category.create({ name });
    res.status(200).json({ category });
  } catch (error) {
    console.error("[❌ CREATE CATEGORY ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.getCategory = async (req, res, next) => {};

exports.updateCategory = async (req, res, next) => {};

exports.deleteCategory = async (req, res, next) => {};
