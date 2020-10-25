import React, { Fragment } from "react";
import { Card, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { deleteProduct } from "../../../redux/actions/product";

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
        await dispatch(deleteProduct(product.slug));
      },
    });
  };

  return (
    <Fragment>
      <Card
        className="admin-product-card"
        cover={
          <img
            className="admin-product-card__image"
            alt={product.title}
            src={product.images[0].url}
          />
        }
        actions={[
          <EditOutlined key="edit" className="admin-product-card__edit-icon" />,
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
