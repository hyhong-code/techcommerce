const Sub = require("../models/Sub");
const Category = require("../models/Category");

exports.createSub = async (req, res, next) => {
  try {
    const { slug: categorySlug } = req.params;
    const { name } = req.body;

    // Handle category not found
    const category = await Category.findOne({ slug: categorySlug }).sort({
      createdAt: -1,
    });

    if (!category) {
      return res.status(404).json({
        errors: [{ msg: `Category with slug ${categorySlug} not found.` }],
      });
    }

    // Handle duplicate name
    let sub = await Sub.findOne({ name });
    if (sub) {
      return res.status(400).json({
        errors: [{ msg: `Sub category with name ${name} is already in use.` }],
      });
    }

    // Create sub category
    sub = await Sub.create({ name, parent: category._id });

    res.status(201).json({ sub });
  } catch (error) {
    console.error("[❌ createSub ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.getSub = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle sub category not found
    const sub = await Sub.findOne({ slug });
    if (!sub) {
      return res.status(404).json({
        errors: [{ msg: `Sub category with slug ${slug} not found.` }],
      });
    }

    res.status(200).json({ sub });
  } catch (error) {
    console.error("[❌ getSub ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.updateSub = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    // Handle du
    let sub = await Sub.findOne({ name });
    if (sub) {
      return res.status(400).json({
        errors: [{ msg: `Sub category with name ${name} already exits.` }],
      });
    }

    // Handle sub category not found
    sub = await Sub.findOne({ slug });
    if (!sub) {
      return res.status(404).json({
        errors: [{ msg: `Sub category with slug ${slug} not found.` }],
      });
    }

    // Update sub category
    sub.name = name;
    sub = await sub.save({ validateBeforeSave: true });

    res.status(200).json({ sub });
  } catch (error) {
    console.error("[❌ updateSub ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.deleteSub = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle sub category not found
    let sub = await Sub.findOne({ slug });
    if (!sub) {
      return res.status(404).json({
        errors: [{ msg: `Sub category with slug ${slug} not found.` }],
      });
    }

    // Delete sub category
    await Sub.findByIdAndDelete(sub._id);

    res
      .status(200)
      .json({ msg: `Sub category ${sub.name} successfully deleted.` });
  } catch (error) {
    console.error("[❌ deleteSub ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.listSubs = async (req, res, next) => {
  try {
    const { slug: categorySlug } = req.params;

    let category;
    let condition = {};

    // List sub categories by category
    if (categorySlug) {
      // Handle category not found
      category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({
          errors: [{ msg: `Category with slug ${categorySlug} not found.` }],
        });
      }
      condition.parent = category._id;
    }

    // Get sub category list
    const subs = await Sub.find(condition);

    res.status(201).json({ subs });
  } catch (error) {
    console.error("[❌ listSubs ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
