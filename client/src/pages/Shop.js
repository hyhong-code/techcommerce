import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Slider, Checkbox, Rate } from "antd";
import {
  DollarCircleOutlined,
  UnorderedListOutlined,
  StarOutlined,
} from "@ant-design/icons";

import LoadingCard from "../components/ui/LoadingCards";
import ProductCard from "../components/products/ProductCard";
import {
  listProductsForShopPage,
  clearFilteredProducts,
  filterProducts,
} from "../redux/actions/product";
import { listCategories } from "../redux/actions/category";

const { SubMenu } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const [
    { filteredProducts, filteredProductsLoading, searchText },
    { categories },
  ] = useSelector(({ product, category }) => [product, category]);

  // State for price
  const [price, setPrice] = useState([0, 5000]);
  const [stars, setStars] = useState([0.5, 5]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(listCategories());
  }, []);

  // Filter product when filter change
  useEffect(() => {
    // If there is search text, filter products base on it
    dispatch(
      filterProducts({
        search: searchText,
        price,
        stars,
        categories: selectedCategories,
      })
    );
  }, [searchText, price, selectedCategories, stars, dispatch]);

  // Clean up filtered products in redux state when moved away from shop page
  useEffect(() => {
    return () => {
      dispatch(clearFilteredProducts());
    };
  }, [dispatch]);

  // Handle categories change
  const handleCategoriesChange = (evt) => {
    if (selectedCategories.includes(evt.target.value)) {
      setSelectedCategories((prev) =>
        prev.filter((cate) => cate !== evt.target.value)
      );
    } else {
      setSelectedCategories((prev) => [...prev, evt.target.value]);
    }
  };

  return (
    <div className="shop">
      <div className="shop__control">
        <h1 className="shop__control__title">Search / Filter</h1>

        {/* Price filter */}
        <Menu
          mode="inline"
          defaultOpenKeys={["1", "2", "3"]}
          className="shop__control__menu"
        >
          <SubMenu key="1" title="Price" icon={<DollarCircleOutlined />}>
            <div className="shop__control__menu__price__slider">
              <Slider
                range
                min={0}
                max={5000}
                value={price}
                onChange={(v) => setPrice(v)}
                tipFormatter={(v) => `$${v}`}
              />
            </div>
          </SubMenu>

          {/* Categories filter */}
          <SubMenu key="2" title="Categories" icon={<UnorderedListOutlined />}>
            <div className="shop__control__menu__categories-check">
              {categories?.map((cate) => (
                <Checkbox
                  checked={selectedCategories.includes(cate.slug)}
                  value={cate.slug}
                  onChange={handleCategoriesChange}
                  key={cate._id}
                  className="shop__control__menu__categories-check__item"
                >
                  {cate.name}
                </Checkbox>
              ))}
            </div>
          </SubMenu>

          {/* Star ratings filter */}
          <SubMenu key="3" title="Stars" icon={<StarOutlined />}>
            <div className="shop__control__menu__stars">
              <div className="shop__control__menu__stars--min">
                <p>Minimium Stars</p>
                <Rate
                  allowHalf
                  value={stars[0]}
                  onChange={(v) => setStars((prev) => [v, prev[1]])}
                />
              </div>

              <div className="shop__control__menu__stars--max">
                <p>Maximium Stars</p>
                <Rate
                  allowHalf
                  value={stars[1]}
                  onChange={(v) => setStars((prev) => [prev[0], v])}
                />
              </div>
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
