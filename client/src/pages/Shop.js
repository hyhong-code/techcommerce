import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../components/ui/LoadingCards";
import ProductCard from "../components/products/ProductCard";

import {
  listProductsForShopPage,
  clearFilteredProducts,
  filterProducts,
} from "../redux/actions/product";

const Shop = () => {
  const dispatch = useDispatch();
  const { filteredProducts, filteredProductsLoading, searchText } = useSelector(
    ({ product }) => product
  );

  useEffect(() => {
    // If there is search text, filter products base on it
    if (searchText) {
      dispatch(filterProducts(searchText));
    } else {
      // Otherwise list all products for user
      dispatch(listProductsForShopPage({}));
    }
  }, [searchText, dispatch]);

  // Clean up filtered products in redux state when moved away from shop page
  useEffect(() => {
    return () => {
      dispatch(clearFilteredProducts());
    };
  }, [dispatch]);

  return (
    <div className="shop">
      <div className="shop__control">Control</div>
      <div className="shop__products">
        {!filteredProductsLoading ? (
          filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="shop__products__not-found">No prodcuts found.</p>
          )
        ) : (
          <LoadingCard count={5} />
        )}
      </div>
    </div>
  );
};

export default Shop;
