import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageFadeIn from "react-image-fade-in";
import { Typography, Space, Input, Select, Radio, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { listCategories } from "../../../redux/actions/category";
import { listSubs } from "../../../redux/actions/sub";
import {
  updateProduct,
  getProduct,
  clearEditingProduct,
} from "../../../redux/actions/product";
import ImageUploader from "../../ui/ImageUploader";
import useImageUploader from "../../../hooks/useImageUploader";
import fileResizer from "../../../utils/fileResizer";
import formatErrorMsg from "../../../utils/formatErrorMsg";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PRODUCT_BRANDS = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];
const PRODUCT_COLORS = ["Black", "Brown", "Silver", "White", "Blue"];

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();

  // Get up to date states
  useEffect(() => {
    dispatch(getProduct(params.slug));
    dispatch(listCategories());
    dispatch(listSubs());

    return () => {
      dispatch(clearEditingProduct());
    };
  }, [dispatch, params.slug]);

  // Grad state from redux
  const [
    categories,
    subs,
    product,
  ] = useSelector(({ category, sub, product }) => [
    category.categories,
    sub.subs,
    product.currentUpdatingProduct,
  ]);

  // Pre populate form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const [selectedSubSlugs, setSelectedSubSlugs] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isShipping, setIsShipping] = useState(true);
  const [existingImages, setExistingImages] = useState([]);
  const { fileList, setFileList, preview, setPreview } = useImageUploader();

  // Other states
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategorySlug) {
      // Set sub category selections whenever category changed
      setSubOptions(
        subs.filter(
          (sub) =>
            sub.parent ===
            categories.find(
              (category) => category.slug === selectedCategorySlug
            )._id
        )
      );
    }

    if (selectedCategorySlug !== product?.category.slug) {
      // Clearout selected sub categories whenever category changed
      setSelectedSubSlugs([]);
    }
  }, [selectedCategorySlug, categories, product, subs]);

  // Pre-fill form state when page loaded
  useEffect(() => {
    if (product) {
      setName(product?.title);
      setDescription(product?.description);
      setPrice(product?.price);
      setQuantity(product?.quantity);
      setSelectedCategorySlug(product?.category.slug);
      setSelectedSubSlugs(product?.subs.map((sub) => sub.slug));
      setSelectedBrand(product?.brand);
      setSelectedColor(product?.color);
      setExistingImages(product?.images);
      setIsShipping(product?.shipping);
    }
  }, [product]);

  // Change category
  const handleCategoryChange = (value, target) => {
    setSelectedCategorySlug(value);
  };

  // Change sub category
  const handleSubsChange = (value) => {
    setSelectedSubSlugs(value);
  };

  // Change brand
  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  // Change color
  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  // Check if all fields are filled
  const validationPassed = () =>
    !!(
      name &&
      description &&
      price &&
      quantity &&
      selectedCategorySlug &&
      selectedSubSlugs.length &&
      fileList.length + existingImages.length > 0 &&
      selectedColor &&
      selectedBrand
    );

  // Disparch create product action
  const handleUpdateProduct = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      // Handle missing fields
      if (!validationPassed()) {
        setLoading(false);
        return message.error("All fields are required", 6);
      }

      // Tranform images into base64
      const imagesPromises = fileList.map((file) =>
        fileResizer(file.originFileObj)
      );
      const images = await Promise.all(imagesPromises);

      // Build formdata
      const formdata = {
        title: name,
        description,
        price,
        quantity,
        category: selectedCategorySlug,
        subs: selectedSubSlugs,
        newImages: images,
        existingImages,
        color: selectedColor,
        brand: selectedBrand,
        shipping: isShipping,
      };

      // Dispatch
      await dispatch(updateProduct(product.slug, formdata));
      message.success(`Product ${name} has been successfully updated.`, 6);
      setFileList([]);
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
    setLoading(false);
  };

  return (
    <form className="update-product" onSubmit={handleUpdateProduct}>
      <Space direction="vertical" size="middle">
        <Title level={2}>Update Product</Title>

        {/* Product Name */}
        <Input
          placeholder="Enter a name"
          allowClear
          onChange={(evt) => setName(evt.target.value)}
          value={name}
          disabled={loading}
          autoFocus
        />

        {/* Product Description */}
        <TextArea
          placeholder="Enter a description"
          allowClear
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
          disabled={loading}
        />

        {/* Product Price */}
        <Input
          placeholder="Enter a price"
          type="number"
          allowClear
          onChange={(evt) => setPrice(evt.target.value)}
          value={price}
          prefix={<span style={{ color: "#d9d9d9" }}>$</span>}
          disabled={loading}
        />

        {/* Product Quantity */}
        <Input
          placeholder="Enter quantity"
          type="number"
          allowClear
          onChange={(evt) => setQuantity(evt.target.value)}
          value={quantity}
          disabled={loading}
        />

        {/* Product brand select */}
        <Select
          placeholder="Select a brand"
          onChange={handleBrandChange}
          value={selectedBrand}
          disabled={loading}
        >
          {PRODUCT_BRANDS.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>

        {/* Product color select */}
        <Select
          placeholder="Select a color"
          onChange={handleColorChange}
          value={selectedColor}
          disabled={loading}
        >
          {PRODUCT_COLORS.map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>

        {/* Product category select */}
        <Select
          placeholder="Select a category"
          onChange={handleCategoryChange}
          value={selectedCategorySlug}
          disabled={loading}
        >
          {categories?.map((category) => (
            <Option key={category._id} value={category.slug}>
              {category.name}
            </Option>
          ))}
        </Select>

        {/* Product sub category multi-select */}
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select sub categories"
          style={{ width: "100%" }}
          value={selectedSubSlugs}
          onChange={handleSubsChange}
          disabled={loading}
        >
          {subOptions.map((sub) => (
            <Option key={sub._id} value={sub.slug}>
              {sub.name}
            </Option>
          ))}
        </Select>

        {/* Shipping or Non-shipping */}
        <Radio.Group
          onChange={(evt) => setIsShipping(evt.target.value)}
          value={isShipping}
          disabled={loading}
        >
          <Radio value={true}>Shipping</Radio>
          <Radio value={false}>Non-shippin</Radio>
        </Radio.Group>

        <div className="update-product__images">
          {existingImages.map((image, idx) => (
            <div key={idx} className="update-product__images__item">
              <ImageFadeIn
                transition={1000}
                src={image.url}
                alt={product.title}
              />
              <Button
                onClick={() =>
                  setExistingImages((prev) =>
                    prev.filter((img) => img.key !== image.key)
                  )
                }
                size="small"
                type="dashed"
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </div>
          ))}
        </div>

        {/* Upload image */}
        <ImageUploader
          fileList={fileList}
          setFileList={setFileList}
          fileListLength={4}
          preview={preview}
          setPreview={setPreview}
          disabled={loading}
        />

        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={!validationPassed()}
        >
          Update
        </Button>
      </Space>
    </form>
  );
};

export default UpdateProduct;
