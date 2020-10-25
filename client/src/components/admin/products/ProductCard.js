import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
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
          className="admin-product-card__delete-icon"
        />,
      ]}
    >
      <Meta title={product.title} description={product.description} />
    </Card>
  );
};

export default ProductCard;
