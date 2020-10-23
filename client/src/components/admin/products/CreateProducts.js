import React, { useEffect, useState } from "react";
import { Typography, Space, Input, Select, Radio, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { listCategories } from "../../../redux/actions/category";
import { listSubs } from "../../../redux/actions/sub";
import { createProduct } from "../../../redux/actions/product";
import ImageUploader from "../../ui/ImageUploader";
import useImageUploader from "../../../hooks/useImageUploader";
import fileResizer from "../../../utils/fileResizer";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PRODUCT_BRANDS = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];
const PRODUCT_COLORS = ["Black", "Brown", "Silver", "White", "Blue"];

const CreateProducts = () => {
  const dispatch = useDispatch();

  // Re-fetch updated category and sub category options
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubs());
  }, [dispatch]);

  // Get category and sub category state from redux
  const [categories, subs] = useSelector(({ category, sub }) => [
    category.categories,
    sub.subs,
  ]);

  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const [selectedSubSlugs, setSelectedSubSlugs] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { fileList, setFileList, preview, setPreview } = useImageUploader();
  const [isShipping, setIsShipping] = useState(true);

  // Other states
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset selected sub categories upon changing cateogry
  useEffect(() => {
    setSelectedSubSlugs([]);
  }, [selectedCategorySlug]);

  // Change category
  const handleCategoryChange = (value, target) => {
    setSelectedCategorySlug(value);
    setSelectedCategoryId(target.key);
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
    name &&
    description &&
    price &&
    quantity &&
    selectedCategorySlug &&
    selectedSubSlugs.length &&
    fileList.length &&
    selectedColor &&
    selectedBrand;

  // Disparch create product action
  const handleCreateProduct = async (evt) => {
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
        images,
        color: selectedColor,
        brand: selectedBrand,
        shipping: isShipping,
      };

      // Dispatch
      await dispatch(createProduct(formdata));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form className="create-products" onSubmit={handleCreateProduct}>
      <Space direction="vertical" size="middle">
        <Title level={2}>Create Product</Title>

        {/* Product Name */}
        <Input
          placeholder="Enter a name"
          allowClear
          onChange={(evt) => setName(evt.target.value)}
          value={name}
          disabled={loading}
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
          {subs
            ?.filter((sub) => sub.parent === selectedCategoryId)
            .map((sub) => (
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
          Create
        </Button>
      </Space>
    </form>
  );
};

export default CreateProducts;
