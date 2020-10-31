import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Slider } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";

import LoadingCard from "../components/ui/LoadingCards";
import ProductCard from "../components/products/ProductCard";
import {
  listProductsForShopPage,
  clearFilteredProducts,
  filterProducts,
} from "../redux/actions/product";

const { SubMenu } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const { filteredProducts, filteredProductsLoading, searchText } = useSelector(
    ({ product }) => product
  );

  //
  const [price, setPrice] = useState([0, 10000]);

  useEffect(() => {
    // If there is search text, filter products base on it
    if (searchText) {
      dispatch(filterProducts({ search: searchText }));
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

  useEffect(() => {
    dispatch(filterProducts({ price }));
  }, [price, dispatch]);

  return (
    <div className="shop">
      <div className="shop__control">
        <h1 className="shop__control__title">Search / Filter</h1>

        {/* Price filter */}
        <Menu
          mode="inline"
          defaultOpenKeys={["1", "2"]}
          className="shop__control__menu"
        >
          <SubMenu key="1" title="Price" icon={<DollarCircleOutlined />}>
            <div className="shop__control__menu__price__slider">
              <Slider
                range
                min={0}
                max={10000}
                value={price}
                onChange={(v) => setPrice(v)}
                tipFormatter={(v) => `$${v}`}
              />
            </div>
          </SubMenu>
        </Menu>
      </div>
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
