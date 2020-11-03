import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  InputNumber,
  Select,
  Popconfirm,
  Card,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";

import { changeQty, changeColor, removeProduct } from "../redux/actions/cart";

const { Option } = Select;

const PRODUCT_COLORS = ["Black", "Brown", "Silver", "White", "Blue"];

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [{ cart }, { user }] = useSelector(({ cart, user }) => [cart, user]);

  // Table data source
  const dataSource = Object.keys(cart).map((key) => ({
    image: {
      image: cart[key].images[0],
      alt: cart[key].title,
    },
    title: cart[key].title,
    price: cart[key].price,
    color: {
      color: cart[key].color,
      id: key,
    },
    count: {
      count: cart[key].count,
      id: key,
      qty: cart[key].quantity,
    },
    shipping: cart[key].shipping,
    remove: { id: key, title: cart[key].title },
    key,
  }));

  // Table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: ({ image, alt }) => (
        <img src={image.url} alt={alt} className="cart__table__image" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <p className="cart__table__title">{title}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>${price}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: ({ color, id }) => (
        <Select value={color} onChange={(v) => dispatch(changeColor(id, v))}>
          {PRODUCT_COLORS.map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      render: ({ count, id, qty }) => (
        <InputNumber
          value={count}
          min={1}
          max={qty}
          onChange={(v) => dispatch(changeQty(id, v))}
        />
      ),
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
      key: "shipping",
      render: (shipping) =>
        shipping ? (
          <CheckCircleOutlined className="cart__table__icon--checked" />
        ) : (
          <CloseCircleOutlined className="cart__table__icon--closed" />
        ),
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
      render: ({ id, title }) => (
        <Popconfirm
          placement="top"
          title={`Delete ${title}`}
          onConfirm={() => dispatch(removeProduct(id))}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button
            size="small"
            shape="circle"
            type="ghost"
            icon={<CloseOutlined />}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="cart">
      {/* Title */}
      <h1 className="cart__title">Your cart:</h1>
      <h2 className="cart__title">Order summary</h2>

      {/* Cart table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        className="cart__table"
      />

      {/* Checkout card */}
      <Card className="cart__checkout">
        <h3 className="cart__checkout__title">Your order:</h3>

        <Divider />

        {/* Checkout items */}
        {Object.values(cart).map((product) => (
          <p key={product._id} className="cart__checkout__item">
            {product.title} (${product.price}) x {product.count} =
            <span> ${(product.price * product.count).toFixed(2)}</span>
          </p>
        ))}

        <Divider />

        {/* Total */}
        <h3 className="cart__checkout__title">Total:</h3>
        <p className="cart__checkout__total">
          $
          {Object.values(cart)
            .reduce((acc, cur) => acc + cur.price * cur.count, 0)
            .toFixed(2)}
        </p>

        <Divider />

        {/* Checkout button */}
        <Button
          type="primary"
          disabled={Object.keys(cart) <= 0}
          onClick={
            user
              ? () => {}
              : () =>
                  history.push({
                    pathname: "/login",
                    state: { from: location.pathname },
                  })
          }
        >
          {user ? "Checkout" : "Log in to checkout"}
        </Button>
      </Card>
    </div>
  );
};

export default Cart;
