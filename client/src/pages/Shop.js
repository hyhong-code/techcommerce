import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Slider, Checkbox, Rate, Select, Button, Radio } from "antd";
import {
  DollarCircleOutlined,
  UnorderedListOutlined,
  StarOutlined,
  OrderedListOutlined,
  AimOutlined,
  CrownOutlined,
  CarOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import LoadingCard from "../components/ui/LoadingCards";
import ProductCard from "../components/products/ProductCard";
import {
  clearFilteredProducts,
  filterProducts,
} from "../redux/actions/product";
import { listCategories } from "../redux/actions/category";
import { listSubs } from "../redux/actions/sub";
import { handleSearchTextChange } from "../redux/actions/product";

const { SubMenu } = Menu;
const { Option } = Select;

const BRANDS = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];
const COLORS = ["Black", "Brown", "Silver", "White", "Blue"];

const Shop = () => {
  const dispatch = useDispatch();
  const [
    { filteredProducts, filteredProductsLoading, searchText },
    { categories },
    { subs },
  ] = useSelector(({ product, category, sub }) => [product, category, sub]);

  // State for price
  const [price, setPrice] = useState([0, 5000]);
  const [stars, setStars] = useState([0.5, 5]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [subsByCategory, setSubsByCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [shipping, setShipping] = useState(true);

  // List categories for checkboxes
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubs());
  }, [dispatch]);

  // Changes sub cateogory options when selected category changes
  useEffect(() => {
    if (selectedCategories.length) {
      const selectedCateIds = selectedCategories.map(
        (cate) => categories.find((c) => c.slug === cate)._id
      );
      setSubsByCategory(
        subs.filter((sub) => selectedCateIds.includes(sub.parent))
      );
    }
  }, [selectedCategories, categories, subs]);

  // Whether display sub categories for a selected cateogry
  // or all sub cateogries
  // Re-run every render
  const subsToDisplay = selectedCategories.length ? subsByCategory : subs;

  // Filter product when filter change
  useEffect(() => {
    // If there is search text, filter products base on it
    dispatch(
      filterProducts({
        search: searchText,
        price,
        stars,
        categories: selectedCategories,
        subs: selectedSubs,
        brand: selectedBrand,
        color: selectedColor,
        shipping,
      })
    );
  }, [
    searchText,
    price,
    selectedCategories,
    stars,
    selectedSubs,
    selectedBrand,
    selectedColor,
    shipping,
    dispatch,
  ]);

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

  // Handle subs change
  const handleSubsChange = (evt) => {
    if (selectedSubs.includes(evt.target.value)) {
      setSelectedSubs((prev) => prev.filter((sub) => sub !== evt.target.value));
    } else {
      setSelectedSubs((prev) => [...prev, evt.target.value]);
    }
  };

  // Reset search text and all filters
  const handleReset = () => {
    dispatch(handleSearchTextChange(""));
    setPrice([0, 5000]);
    setSelectedCategories([]);
    setSelectedSubs([]);
    setStars([0.5, 5]);
    setSelectedBrand("");
    setSelectedColor("");
    setShipping(true);
  };

  return (
    <div className="shop">
      <div className="shop__control">
        <h1 className="shop__control__title">Filter Products</h1>

        {/* Reset button */}
        <div className="shop__control__reset">
          <Button size="small" onClick={handleReset}>
            Reset <RollbackOutlined />
          </Button>
        </div>

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

          {/* Sub category filter */}
          <SubMenu
            key="3"
            title="Sub Categories"
            icon={<OrderedListOutlined />}
          >
            <div className="shop__control__menu__sub-category">
              {subsToDisplay?.map((sub) => (
                <Checkbox
                  checked={selectedSubs.includes(sub.slug)}
                  value={sub.slug}
                  onChange={handleSubsChange}
                  key={sub._id}
                  className="shop__control__menu__categories-check__item"
                >
                  {sub.name}
                </Checkbox>
              ))}
            </div>
          </SubMenu>

          {/* Star ratings filter */}
          <SubMenu key="4" title="Stars" icon={<StarOutlined />}>
            <div className="shop__control__menu__stars">
              {/* Max stars */}
              <div className="shop__control__menu__stars--min">
                <p>Minimium Stars</p>
                <Rate
                  allowHalf
                  value={stars[0]}
                  onChange={(v) =>
                    setStars((prev) => {
                      if (v < 0.5) {
                        return [0.5, prev[1]];
                      } else if (v > 5) {
                        return [5, prev[1]];
                      } else {
                        return [v, prev[1]];
                      }
                    })
                  }
                />
              </div>

              {/* Min stars */}
              <div className="shop__control__menu__stars--max">
                <p>Maximium Stars</p>
                <Rate
                  allowHalf
                  value={stars[1]}
                  onChange={(v) =>
                    setStars((prev) => {
                      if (v < 0.5) {
                        return [prev[0], 0.5];
                      } else if (v > 5) {
                        return [prev[0], 5];
                      } else {
                        return [prev[0], v];
                      }
                    })
                  }
                />
              </div>
            </div>
          </SubMenu>

          {/* Brand filter */}
          <SubMenu key="5" title="Brand" icon={<AimOutlined />}>
            <div className="shop__control__menu__brands">
              <Select
                value={selectedBrand || "Select a brand"} // Default value
                onChange={(value) => setSelectedBrand(value)}
                className="shop__control__menu__brands__select"
                allowClear
              >
                {BRANDS.map((brand) => (
                  <Option value={brand} key={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </div>
          </SubMenu>

          {/* Color filter */}
          <SubMenu key="6" title="Color" icon={<CrownOutlined />}>
            <div className="shop__control__menu__colors">
              <Select
                value={selectedColor || "Select a color"} // Default value
                onChange={(value) => setSelectedColor(value)}
                className="shop__control__menu__colors__select"
                allowClear
              >
                {COLORS.map((color) => (
                  <Option value={color} key={color}>
                    {color}
                  </Option>
                ))}
              </Select>
            </div>
          </SubMenu>

          {/* Shipping filter */}
          <SubMenu key="7" title="Shipping" icon={<CarOutlined />}>
            <div className="shop__control__menu__shipping">
              <Radio.Group
                onChange={() => setShipping((prev) => !prev)}
                value={shipping}
              >
                <Radio value={true}>Shipping</Radio>
                <Radio value={false}>Non-shipping</Radio>
              </Radio.Group>
            </div>
          </SubMenu>
        </Menu>
      </div>

      {/* Product cards */}
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
