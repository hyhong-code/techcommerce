import React, { useState } from "react";
import { Typography, Select, Input, Button, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import formatErrorMsg from "../../../utils/formatErrorMsg";
import { createSub } from "../../../redux/actions/sub";
const { Title } = Typography;
const { Option } = Select;

const CreateSub = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector(({ category }) => category);

  const handleSelectCategory = (value) => {
    setSelectedCategorySlug(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!selectedCategorySlug) {
      return message.error(`Please select a category!`, 6);
    }

    setLoading(true);
    try {
      await dispatch(createSub(selectedCategorySlug, name));
      message.success(`Sub cateogry ${name} successfully created.`);
      setSelectedCategorySlug(null);
      setName("");
    } catch (error) {
      message.error(formatErrorMsg(error));
    }
    setLoading(false);
  };

  return (
    <form className="create-sub" onSubmit={handleSubmit}>
      <Space direction="vertical" size="middle">
        <Title level={2}>Create Sub Category</Title>

        {/* Input */}
        <Input
          placeholder="Enter a sub category name"
          type="text"
          autoFocus
          allowClear
          value={name}
          disabled={loading}
          onChange={(evt) => setName(evt.target.value)}
        />

        {/* Select */}
        <Select
          placeholder="Select a category"
          onChange={handleSelectCategory}
          value={selectedCategorySlug}
          style={{ width: 200 }}
          disabled={loading}
        >
          {categories?.map((category) => (
            <Option key={category._id} value={category.slug}>
              {category.name}
            </Option>
          ))}
        </Select>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!(name && selectedCategorySlug)}
        >
          Create
        </Button>
      </Space>
    </form>
  );
};

export default CreateSub;
