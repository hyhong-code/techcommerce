import React from "react";
import { Card, Rate, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ImageFadeIn from "react-image-fade-in";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { openDrawer } from "../../redux/actions/drawer";
import { addToCart } from "../../redux/actions/cart";
import getAverageProductRating from "../../utils/getAverageProductRating";

const { Meta } = Card;

const isItemInCart = (cart, id) => Object.keys(cart).includes(id);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ cart }) => cart);

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
        <Tooltip
          title={
            isItemInCart(cart, product._id)
              ? "Added to cart"
              : "Add item to cart"
          }
        >
          <div
            key={2}
            onClick={() => {
              dispatch(addToCart(product));
              dispatch(openDrawer());
            }}
          >
            <ShoppingCartOutlined className="product-card__cart-icon" />
            <p>Add to cart</p>
          </div>
        </Tooltip>,
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
