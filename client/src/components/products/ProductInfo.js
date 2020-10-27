import React, { Fragment } from "react";
import { Card, Tag } from "antd";

import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
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
        <div className="product-info__card__inner">
          {/* Price */}
          <div className="product-info__card__inner__row">
            <span>Price</span>
            <span>${product?.price}</span>
          </div>

          {/* Category */}
          <div className="product-info__card__inner__row">
            <span>Category</span>
            <Tag>{product?.category.name}</Tag>
          </div>

          {/* Sub categories */}
          <div className="product-info__card__inner__row">
            <span>Sub category</span>
            {product?.subs.map((sub) => (
              <Tag key={sub._id}>{sub.name}</Tag>
            ))}
          </div>

          {/* Shipping */}
          <div className="product-info__card__inner__row">
            <span>Shipping</span>
            <span>{product?.shipping ? "Yes" : "No"}</span>
          </div>

          {/* Brand */}
          <div className="product-info__card__inner__row">
            <span>Brand</span>
            <span>{product?.brand}</span>
          </div>

          {/* Color */}
          <div className="product-info__card__inner__row">
            <span>Color</span>
            <span>{product?.color}</span>
          </div>

          {/* Quantity available */}
          <div className="product-info__card__inner__row">
            <span>Availability</span>
            <span>{product?.quantity}</span>
          </div>

          {/* Quantity sold */}
          <div className="product-info__card__inner__row">
            <span>Sold</span>
            <span>{product?.sold}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductInfo;
