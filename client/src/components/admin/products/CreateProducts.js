import React, { useEffect, useState } from "react";
import { Typography, Space, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { listCategories } from "../../../redux/actions/category";
import { listSubs } from "../../../redux/actions/sub";

import ImageUploader from "../../ui/ImageUploader";
import useImageUploader from "../../../hooks/useImageUploader";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubs());
  }, [dispatch]);

  const [categories, subs] = useSelector(({ category, sub }) => [
    category.categories,
    sub.subs,
  ]);
  const { fileList, setFileList, preview, setPreview } = useImageUploader();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubSlugs, setSelectedSubSlugs] = useState([]);

  useEffect(() => {
    setSelectedSubSlugs([]);
  }, [selectedCategorySlug]);

  const handleCategoryChange = (value, target) => {
    setSelectedCategorySlug(value);
    setSelectedCategoryId(target.key);
  };

  const handleSubsChange = (value) => {
    setSelectedSubSlugs(value);
  };

  const handleCreateProduct = () => {};

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
        />

        {/* Product Description */}
        <TextArea
          placeholder="Enter a description"
          allowClear
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
        />

        {/* Product Price */}
        <Input
          placeholder="Enter a price"
          type="number"
          allowClear
          onChange={(evt) => setPrice(evt.target.value)}
          value={price}
          prefix={<span style={{ color: "#d9d9d9" }}>$</span>}
        />

        {/* Product category select */}
        <Select
          placeholder="Select a category"
          onChange={handleCategoryChange}
          value={selectedCategorySlug}
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
        >
          {subs
            ?.filter((sub) => sub.parent === selectedCategoryId)
            .map((sub) => (
              <Option key={sub._id} value={sub.slug}>
                {sub.name}
              </Option>
            ))}
        </Select>

        {/* Upload image */}
        <ImageUploader
          fileList={fileList}
          setFileList={setFileList}
          fileListLength={4}
          preview={preview}
          setPreview={setPreview}
        />
      </Space>
    </form>
  );
};

export default CreateProducts;
