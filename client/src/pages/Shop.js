import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      <div className="shop__control"></div>
      <div className="shop__products">{JSON.stringify(filterProducts)}</div>
    </div>
  );
};

export default Shop;
