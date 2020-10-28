import React, { Fragment } from "react";
import { Card, Rate } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ImageFadeIn from "react-image-fade-in";
import { Link } from "react-router-dom";

import getAverageProductRating from "../../utils/getAverageProductRating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Card
      className="product-card"
      cover={
        <ImageFadeIn
          transition={1000}
          className="product-card__image"
          alt={product.title}
          src={product.images[0].url}
        />
      }
      actions={[
        <Link key={1} to={`/products/${product.slug}`}>
          <EyeOutlined className="product-card__eye-icon" />
          <p>Details</p>
        </Link>,
        <Fragment key={2}>
          <ShoppingCartOutlined className="product-card__cart-icon" />
          <p>Add to cart</p>
        </Fragment>,
      ]}
    >
      <Meta
        title={`${product.title} - $${product.price}`}
        description={product.description}
      />
      <div className="product-card__ratings">
        <Rate
          allowHalf
          disabled
          value={getAverageProductRating(product.ratings)}
        />
        <span className="product-card__ratings__count">
          ({product.ratings.length})
        </span>
      </div>
    </Card>
  );
};

export default ProductCard;
