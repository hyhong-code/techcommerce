import React, { Fragment, useState, useEffect } from "react";
import { Card, Tag, Modal, Rate, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import randomTagColor from "../../utils/randomTagColor";
import { updateRating } from "../../redux/actions/product";

const { Meta } = Card;

const getUserRating = (productRatings, user) =>
  productRatings.find((rating) => rating.postedBy === user._id)?.star || 0;

const hasUserRatedBefore = (productRatings, user) =>
  !!productRatings.find((rating) => rating.postedBy === user._id);

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(({ user }) => user);
  const [productRating, setProductRating] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // Prefill user's ratings of this product if any
    user && setProductRating(getUserRating(product.ratings, user));
  }, [user, product]);

  const handleUpdateRating = async () => {
    try {
      await dispatch(updateRating(product.slug, productRating));
      message.success(`Thanks for rating ${product.title}!`, 6);
      setModalShow(false);
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  return (
    <Fragment>
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
            <div
              key={3}
              onClick={() =>
                user ? setModalShow(true) : history.push("/login")
              }
            >
              <StarOutlined className="product-info__card__actions--star" />
              {user ? (
                hasUserRatedBefore(product.ratings, user) ? (
                  <p>Edit your rating</p> // User rated before
                ) : (
                  <p>Leave a rating</p> // User never rated
                )
              ) : (
                <p>Log in to leave a rating</p> // User not authenticated
              )}
            </div>,
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

              <div className="product-info__card__inner__row__tags">
                <Link to={`/categories/${product?.category.slug}`}>
                  <Tag color={randomTagColor()}>{product?.category.name}</Tag>
                </Link>
              </div>
            </li>

            {/* Sub categories */}
            <li className="product-info__card__inner__row">
              <span>Sub category</span>
              <div className="product-info__card__inner__row__tags">
                {product?.subs.map((sub) => (
                  <Link to={`/subs/${sub.slug}`} key={sub._id}>
                    <Tag color={randomTagColor()}>{sub.name}</Tag>
                  </Link>
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

      {/* Update rating modal */}
      <Modal
        visible={modalShow}
        onOk={handleUpdateRating}
        onCancel={() => setModalShow(false)}
        title={`Rate ${product.title}`}
      >
        <Rate value={productRating} onChange={setProductRating} />
      </Modal>
    </Fragment>
  );
};

export default ProductInfo;
