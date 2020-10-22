import React from "react";
import { useSelector } from "react-redux";

import CreateCategory from "./CreateCategory";
import CategoryTag from "./CategoryTag";
import { Typography, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useFilter from "../../../hooks/useFilter";
const { Title } = Typography;

const Categories = () => {
  const { categories } = useSelector(({ category }) => category);
  const { filter, filterKeyword, setFilterKeyword } = useFilter();

  return (
    <Space direction="vertical" size="large" className="categories">
      {/* Category form */}
      <CreateCategory />

      {/* Category Tags */}
      <Space direction="vertical">
        <Title level={2} className="categories__tags-title">
          Categories
        </Title>

        {/* Search Input */}
        <Input
          prefix={<SearchOutlined />}
          placeholder="Filter..."
          allowClear
          value={filterKeyword}
          onChange={(evt) => setFilterKeyword(evt.target.value)}
        />

        {filter(categories, "name").map((category) => (
          <CategoryTag category={category} key={category._id} />
        ))}
      </Space>
    </Space>
  );
};

export default Categories;
