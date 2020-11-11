import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, message, Popconfirm, Typography } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

import formatErrorMsg from "../../utils/formatErrorMsg";
import { removeFromWishlist } from "../../redux/actions/user";

const { Title } = Typography;

const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);

  const handleRemoveFromWishlist = async (product) => {
    try {
      await dispatch(removeFromWishlist(product._id));
      message.success(`${product.title} removed from your wishlist.`);
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
  };

  return (
    <div className="user-wishlist">
      <Title level={2} className="user-wishlist__title">
        Your Wishlist
      </Title>

      <div className="user-wishlist__inner">
        {user.wishlist.map((product) => (
          <div className="user-wishlist__item">
            {/* Product image */}
            <img
              src={product.images[0].url}
              alt={product.title}
              className="user-wishlist__item__img"
            />

            {/* Link to the product */}
            <div className="user-wishlist__item__content">
              <Link to={`/products/${product.slug}`}>{product.title}</Link>
            </div>

            {/* Delete button */}
            <Popconfirm
              title={`Remove ${product.title} from wishlist?`}
              onConfirm={() => handleRemoveFromWishlist(product)}
            >
              <Button
                type="ghost"
                icon={<DeleteOutlined />}
                size="small"
                className="user-wishlist__item__close"
              />
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
