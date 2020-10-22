import React from "react";
import { useSelector } from "react-redux";

import CreateCategory from "./CreateCategory";
import CategoryTag from "./CategoryTag";
import { Typography, Space } from "antd";
const { Title } = Typography;

const Categories = () => {
  const categories = useSelector(({ category: { categories } }) => categories);

  return (
    <Space direction="vertical" size="large" className="categories">
      {/* Category form */}
      <CreateCategory />

      {/* Category Tags */}
      <div>
        <Title level={2}>Categories</Title>
        {categories?.map((category) => (
          <CategoryTag category={category} key={category._id} />
        ))}
      </div>
    </Space>
  );
};

export default Categories;
