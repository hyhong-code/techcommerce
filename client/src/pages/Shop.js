import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../components/ui/LoadingCards";
import ProductCard from "../components/products/ProductCard";

import {
  listProductsForShopPage,
  clearFilteredProducts,
} from "../redux/actions/product";

const Shop = () => {
  const dispatch = useDispatch();
  const { filterProducts, filterProductsLoading } = useSelector(
    ({ product }) => product
  );

  useEffect(() => {
    if (filterProductsLoading) {
      dispatch(listProductsForShopPage({}));
    }
  }, [filterProductsLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearFilteredProducts());
    };
  }, [dispatch]);

  return (
    <div className="shop">
      <div className="shop__control">Control</div>
      <div className="shop__products">
        {!filterProductsLoading ? (
          filterProducts.length ? (
            filterProducts.map((product) => (
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
