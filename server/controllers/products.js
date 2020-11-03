const Product = require("../models/Product");
const Category = require("../models/Category");
const Sub = require("../models/Sub");

const { s3UploadImage, s3DeleteImage } = require("../utils/s3");

exports.createProduct = async (req, res, next) => {
  const {
    title,
    category: selectedCategory,
    subs: selectedSubs,
    images: uploadedImages,
  } = req.body;
  try {
    // Handle duplicate name
    let product = await Product.findOne({ title });
    if (product) {
      return res.status(400).json({
        errors: [{ msg: `Product with name ${title} already exists.` }],
      });
    }

    // Handle category not exists
    const category = await Category.findOne({ slug: selectedCategory });
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: `Category with slug ${selectedCategory} not found.` }],
      });
    }

    // Handle no sub categories
    const subs = await Sub.find({ slug: { $in: selectedSubs } });
    if (!subs.length) {
      return res.status(400).json({
        errors: [{ msg: `At least 1 sub category is required.` }],
      });
    }

    // Upload Images
    const uploadPromises = uploadedImages.map((image) =>
      s3UploadImage(image, "products")
    );
    const images = (await Promise.all(uploadPromises)).map((image) => ({
      key: image.Key,
      url: image.Location,
    }));

    // Create product in DB
    product = await Product.create({
      ...req.body,
      images,
      category,
      subs,
    });

    // Populate category and subs
    product = await product.populate("category subs").execPopulate();
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
    const { slug } = req.params;

    // Handle product not found
    let product = await Product.findOne({ slug });
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: `Product with slug ${slug} not found.` }] });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("[❌ getProduct ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const {
      category: selectedCategory,
      subs: selectedSubs,
      newImages,
      existingImages,
    } = req.body;

    // Handle product not found
    let product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        errors: [{ msg: `Product with slug ${slug} not found.` }],
      });
    }

    // Handle category not exists
    const category = await Category.findOne({ slug: selectedCategory });
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: `Category with slug ${selectedCategory} not found.` }],
      });
    }

    // Handle no sub categories
    const subs = await Sub.find({ slug: { $in: selectedSubs } });
    if (!subs.length) {
      return res.status(400).json({
        errors: [{ msg: `At least 1 sub category is required.` }],
      });
    }

    // Deletes existing images if user choose to
    const deletedImages = product.images.filter(
      (img) => !existingImages.map((i) => i.key).includes(img.key)
    );
    const deleteImagePromises = deletedImages.map((img) =>
      s3DeleteImage(img.key)
    );
    await Promise.all(deleteImagePromises);

    // Upload new images
    const uploadImagePromises = newImages.map((img) =>
      s3UploadImage(img, "products")
    );
    const imagesToStore = (
      await Promise.all(uploadImagePromises)
    ).map((img) => ({ url: img.Location, key: img.Key }));

    // Update product
    Object.entries({
      ...req.body,
      images: [...existingImages, ...imagesToStore],
      category,
      subs,
    }).forEach(([key, value]) => {
      product[key] = value;
    });
    product = await product.save({ validateBeforeSave: true });
    res.status(200).json({ product });
  } catch (error) {
    console.error("[❌ updateProduct ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle product not found
    let product = await Product.findOne({ slug });
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: `Product with slug ${slug} not found.` }] });
    }

    // Delete images from S3
    const deleteImagePromises = product.images.map((image) =>
      s3DeleteImage(image.key)
    );
    await Promise.all(deleteImagePromises);

    // Delete product from DB
    await Product.findByIdAndDelete(product._id);

    res.status(200).json({ msg: `${product.title} is successfully deleted.` });
  } catch (error) {
    console.error("[❌ deleteProduct ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.listProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 25;
    const order = req.query.order && req.query.order === "asc" ? 1 : -1;
    const skip =
      req.query.skip && !isNaN(Number(req.query.skip))
        ? Number(req.query.skip)
        : 0;

    const sort = {};
    switch (req.query.type) {
      case "new-arrival":
        sort.createdAt = order;
        break;
      case "best-selling":
        sort.sold = order;
      default:
        sort.createdAt = order;
        break;
    }

    const filterObj = {};
    if (req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      filterObj.category = category._id;
    }
    if (req.query.sub) {
      const sub = await Sub.findOne({ slug: req.query.sub });
      filterObj.subs = sub._id;
    }

    const products = await Product.find(filterObj)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    const count = await Product.countDocuments();
    res.status(200).json({ products, count });
  } catch (error) {
    console.error("[❌ listProducts ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.updateRating = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { star } = req.body; // 1 - 5

    // Handle product not found
    let product = await Product.findOne({ slug });
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: `Product with slug ${slug} not found.` }] });
    }

    // Check if user already left a rating
    const rating = product.ratings.find(
      (r) => r.postedBy.toString() === req.user._id.toString()
    );

    if (rating) {
      // Update user's rating
      rating.star = star;
      product = await product.save({ validateBeforeSave: true });

      // await Product.updateOne(
      //   { ratings: { $elemMatch: rating } }, // Finds the matched rating from the rating array (ratings)
      //   { $set: { "ratings.$.star": star } }, // What value to update the matched rating
      //   { new: true, runValidators: true }
      // );
      // product = await Product.findById(product._id);
    } else {
      // Create a new rating
      product = await Product.findByIdAndUpdate(
        product._id,
        { $push: { ratings: { star, postedBy: req.user._id } } },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("[❌ updateRating ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.listSimilarProducts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle product not exits
    const product = await Product.findOne({ slug });
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: `Product with slug ${slug} not found.` }] });
    }

    // Find similar products
    const products = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
    })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({ products });
  } catch (error) {
    console.error("[❌ listSimilarProducts ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

exports.filterProducts = async (req, res, next) => {
  try {
    console.log("filterProducts ----->", req.body);

    const {
      search,
      price,
      categories,
      stars,
      subs,
      color,
      brand,
      shipping,
    } = req.body;

    let filterObj = {};

    // Filter by search text
    if (search) {
      // $text searches all the fields with text:true on Product model
      filterObj["$text"] = { $search: req.body.search };
    }

    // Filter by price - [20,200], a range
    filterObj.price = { $gte: price[0], $lte: price[1] };

    // Filter by categories
    if (categories && categories.length) {
      const selectedCateogryIds = (
        await Category.find({
          slug: { $in: categories },
        })
      ).map((cate) => cate._id);
      filterObj.category = { $in: selectedCateogryIds };
    }

    // Filter by subs
    if (subs && subs.length) {
      const selectedSubIds = (await Sub.find({ slug: { $in: subs } })).map(
        (sub) => sub._id
      );
      filterObj.subs = { $in: selectedSubIds };
    }

    // Filter by color
    if (color) {
      filterObj.color = color;
    }

    // Filter by brand
    if (brand) {
      filterObj.brand = brand;
    }

    // Filter by shipping
    filterObj.shipping = shipping;

    // Apply all filters except for stars
    products = await Product.find(filterObj).sort({ createdAt: -1 });

    // Filter by stars
    if (stars && (stars[0] !== 0 || stars[1] !== 5)) {
      // Aggregation Pipeline to find documents that fits the star range
      const productsFilteredByStars = (
        await Product.aggregate([
          {
            $project: {
              document: "$$ROOT", // $$ROOT gets the whole document
              // title:"$title",
              // price:"$price"
              avgStars: { $avg: "$ratings.star" },
            },
          },
          { $match: { avgStars: { $gte: stars[0], $lte: stars[1] } } },
        ])
      ).map((product) => product.document);

      // Filter products by correct star ratings
      products = products.filter((prod) =>
        productsFilteredByStars.find(
          (p) => p._id.toString() === prod._id.toString()
        )
      );

      // filterObj.avgStars = { $gte: stars[0], $lte: stars[1] };
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.error("[❌ filterProducts ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};
