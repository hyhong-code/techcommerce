import React, { Fragment } from "react";
import { Card, Tag } from "antd";

import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import randomTagColor from "../../utils/randomTagColor";

const { Meta } = Card;

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <Card
        actions={[
          // Add to shopping cart
          <Fragment key={1}>
            <ShoppingCartOutlined className="product-info__card__actions--cart" />
            <p>Add to cart</p>
          </Fragment>,

          // Add to wishlist
          <Fragment key={2}>
            <HeartOutlined className="product-info__card__actions--heart" />
            <p>Add to wishlist</p>
          </Fragment>,

          // Leave a rating
          <Fragment key={3}>
            <StarOutlined className="product-info__card__actions--star" />
            <p>Leave a rating</p>
          </Fragment>,
        ]}
        className="product-info__card"
      >
        <Meta
          // Product title
          title={product?.title}
          // Product description
          description={
            <p className="product-info__card__description">
              {product?.description}
            </p>
          }
        />
        <ul className="product-info__card__inner">
          {/* Price */}
          <div className="product-info__card__inner__row">
            <span>Price</span>
            <span>${product?.price}</span>
          </div>

          {/* Category */}
          <li className="product-info__card__inner__row">
            <span>Category</span>
            <Tag color={randomTagColor()}>{product?.category.name}</Tag>
          </li>

          {/* Sub categories */}
          <li className="product-info__card__inner__row">
            <span>Sub category</span>
            <div className="product-info__card__inner__row__tags">
              {product?.subs.map((sub) => (
                <Tag color={randomTagColor()} key={sub._id}>
                  {sub.name}
                </Tag>
              ))}
            </div>
          </li>

          {/* Shipping */}
          <li className="product-info__card__inner__row">
            <span>Shipping</span>
            <span>{product?.shipping ? "Yes" : "No"}</span>
          </li>

          {/* Brand */}
          <li className="product-info__card__inner__row">
            <span>Brand</span>
            <span>{product?.brand}</span>
          </li>

          {/* Color */}
          <li className="product-info__card__inner__row">
            <span>Color</span>
            <span>{product?.color}</span>
          </li>

          {/* Quantity available */}
          <li className="product-info__card__inner__row">
            <span>Availability</span>
            <span>{product?.quantity}</span>
          </li>

          {/* Quantity sold */}
          <li className="product-info__card__inner__row">
            <span>Sold</span>
            <span>{product?.sold}</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ProductInfo;
