import React, { Fragment } from "react";
import { Card, Modal, message, Rate } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import formatErrorMsg from "../../../utils/formatErrorMsg";
import { deleteProduct } from "../../../redux/actions/product";
import ImageFadeIn from "react-image-fade-in";
import getAverageProductRating from "../../../utils/getAverageProductRating";

const { Meta } = Card;
const { confirm } = Modal;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const showDeletePopup = (evt) => {
    evt.preventDefault();
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${product.title}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      maskClosable: true,
      async onOk() {
        try {
          await dispatch(deleteProduct(product.slug));
          message.success(`${product.title} successfully deleted.`, 6);
        } catch (error) {
          message.error(formatErrorMsg(error), 6);
          throw error; // So the modal does not auto close
        }
      },
    });
  };

  return (
    <Fragment>
      <Card
        className="admin-product-card"
        cover={
          <ImageFadeIn
            transition={1000}
            className="admin-product-card__image"
            alt={product.title}
            src={product.images[0].url}
          />
        }
        actions={[
          <Link key={1} to={`/admin/products/${product.slug}`}>
            <EditOutlined
              key="edit"
              className="admin-product-card__edit-icon"
            />
          </Link>,
          <DeleteOutlined
            key={2}
            onClick={showDeletePopup}
            className="admin-product-card__delete-icon"
          />,
        ]}
      >
        <Meta
          title={`${product.title} - $${product.price}`}
          description={product.description}
        />
        <div className="admin-product-card__ratings">
          <Rate
            allowHalf
            disabled
            value={getAverageProductRating(product.ratings)}
          />
          <span className="admin-product-card__ratings__count">
            ({product.ratings.length})
          </span>
        </div>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
