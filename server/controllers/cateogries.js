const Category = require("../models/Category");

exports.listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({ categories });
  } catch (error) {
    console.error("[❌ listCategories ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

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
    console.error("[❌ createCategory ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle category not found.
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ errors: [{ msg: `Category with slug ${slug} not found.` }] });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error("[❌ getCategory ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    // Handle duplicate name
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        errors: [{ msg: `Category with name ${name} already exists.` }],
      });
    }

    // Handle category not found.
    category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ errors: [{ msg: `Category with slug ${slug} not found.` }] });
    }

    // Update category
    category.name = name;
    category = await category.save({ validateBeforeSave: true });

    res.status(200).json({ category });
  } catch (error) {
    console.error("[❌ updateCategory ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle category not found.
    let category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ errors: [{ msg: `Category with slug ${slug} not found.` }] });
    }

    // Update category
    await Category.findOneAndDelete({ slug });

    res.status(200).json({ msg: `Category ${category.name} was successfully deleted.` });
  } catch (error) {
    console.error("[❌ updateCategory ERROR]", error);
    res.status(500).json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
