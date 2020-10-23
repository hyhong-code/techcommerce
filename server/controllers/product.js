const Product = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);

    const product = await Product.create(req.body);

    res.status(201).json({ product });
  } catch (error) {
    console.error("[❌ createProduct ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.updateProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.deleteProduct = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.listProducts = async (req, res, next) => {
  try {
  } catch (error) {}
};
