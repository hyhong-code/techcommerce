import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { listCategories } from "../../../redux/actions/category";
import CreateCategory from "./CreateCategory";
import CategoryTag from "./CategoryTag";
import { Typography, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useFilter from "../../../hooks/useFilter";
const { Title } = Typography;

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const { categories } = useSelector(({ category }) => category);
  const { filter, filterKeyword, setFilterKeyword } = useFilter();

  return (
    <div className="categories">
      {/* Category form */}
      <CreateCategory />

      {/* Category Tags */}

      <Title level={2} className="categories__tags-title">
        Categories
      </Title>

      {/* Search Input */}
      <Input
        prefix={<SearchOutlined />}
        placeholder="Filter categories..."
        allowClear
        value={filterKeyword}
        onChange={(evt) => setFilterKeyword(evt.target.value)}
        className="categories__tag-input"
      />

      {filter(categories, "name").map((category) => (
        <CategoryTag category={category} key={category._id} />
      ))}
    </div>
  );
};

export default Categories;
