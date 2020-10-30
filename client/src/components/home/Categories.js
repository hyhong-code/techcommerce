import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tag, Spin } from "antd";

import { listCategories } from "../../redux/actions/category";
import randomTagColor from "../../utils/randomTagColor";

const Categories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(listCategories());
      setLoading(false);
    })();
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
        {!loading ? (
          categories?.map((category) => (
            <Link to={`/categories/${category.slug}`} key={category._id}>
              <Tag
                color={randomTagColor()}
                className="home-categories__tags__item"
              >
                {category.name}
              </Tag>
            </Link>
          ))
        ) : (
          <Spin size="large" />
        )}
      </div>
    </div>
  );
};

export default Categories;
