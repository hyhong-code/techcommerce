import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tag } from "antd";

import { listCategories } from "../../redux/actions/category";
import randomTagColor from "../../utils/randomTagColor";

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const { categories } = useSelector(({ category }) => category);
  return (
    <div className="home-categories">
      {/* Lead */}
      <div className="home-categories__lead">
        <h2>Categories</h2>
      </div>

      {/* Tags */}
      <div className="home-categories__tags">
        {categories?.map((category) => (
          <Link to={`/categories/${category.slug}`} key={category._id}>
            <Tag
              color={randomTagColor()}
              className="home-categories__tags__item"
            >
              {category.name}
            </Tag>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
