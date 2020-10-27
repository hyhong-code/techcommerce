import React, { Fragment } from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ImageFadeIn from "react-image-fade-in";
import { Link } from "react-router-dom";

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
        <Link to={`/products/${product.slug}`}>
          <EyeOutlined className="product-card__eye-icon" />
          <p>Details</p>
        </Link>,
        <Fragment>
          <ShoppingCartOutlined className="product-card__cart-icon" />
          <p>Add to cart</p>
        </Fragment>,
      ]}
    >
      <Meta
        title={`${product.title} - $${product.price}`}
        description={product.description}
      />
    </Card>
  );
};

export default ProductCard;
