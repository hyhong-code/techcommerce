import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearProductsByCateogry,
  listProductsByCategory,
} from "../redux/actions/product";
import { listCategories } from "../redux/actions/category";
import ProductCard from "../components/products/ProductCard";
import LoadingCard from "../components/ui/LoadingCards";

const Category = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsByCategory(slug));
    dispatch(listCategories());
    return () => {
      dispatch(clearProductsByCateogry());
    };
  }, [dispatch, slug]);

  const [
    { productsByCategory, productsByCategoryLoading },
    { categories },
  ] = useSelector(({ product, category }) => [product, category]);

  return (
    <div className="category">
      {/* Lead */}
      <div className="category__lead">
        <h1>
          {productsByCategory?.length} products found with category "
          {categories?.find((c) => c.slug === slug).name}"
        </h1>
      </div>

      {/* Product cards */}
      <div className="category__products">
        {!productsByCategoryLoading ? (
          productsByCategory?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <LoadingCard count={5} />
        )}
      </div>
    </div>
  );
};

export default Category;
