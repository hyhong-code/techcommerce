import React, { Fragment } from "react";
import { Card, Modal, message } from "antd";
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

const { Meta } = Card;
const { confirm } = Modal;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const showDeletePopup = (evt, category) => {
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
          <Link to={`/admin/products/${product.slug}`}>
            <EditOutlined
              key="edit"
              className="admin-product-card__edit-icon"
            />
          </Link>,
          <DeleteOutlined
            key="delete"
            onClick={showDeletePopup}
            className="admin-product-card__delete-icon"
          />,
        ]}
      >
        <Meta title={product.title} description={product.description} />
      </Card>
    </Fragment>
  );
};

export default ProductCard;
