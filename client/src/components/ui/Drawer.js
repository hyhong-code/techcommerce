import React from "react";
import { Drawer, Image, Badge, Button, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { closeDrawr } from "../../redux/actions/drawer";
import { changeQty, removeProduct } from "../../redux/actions/cart";

const _Drawer = () => {
  const dispatch = useDispatch();
  const [{ visible }, { cart }] = useSelector(({ drawer, cart }) => [drawer, cart]);

  return (
    <Drawer visible={visible} onClose={() => dispatch(closeDrawr())} className="drawer">
      {Object.values(cart).map((item) => (
        <div key={item._id} className="drawer__item">
          <Badge.Ribbon
            text={`${item.title} * ${item.count} - $${(item.price * item.count).toFixed(2)}`}
          >
            {/* Product images */}
            <Image src={item.images[0].url} alt={item.title} className="drawer__item__image" />
          </Badge.Ribbon>

          {/* Minus button */}
          <Button
            shape="circle"
            size="small"
            icon={<MinusOutlined />}
            className="drawer__item__action--minus"
            disabled={item.count - 1 < 1}
            onClick={() => {
              if (item.count - 1 >= 1) {
                dispatch(changeQty(item._id, --item.count));
              }
            }}
          />

          {/* Plus button */}
          <Button
            shape="circle"
            size="small"
            icon={<PlusOutlined />}
            className="drawer__item__action--plus"
            disabled={item.count + 1 > item.quantity}
            onClick={() => {
              if (item.count + 1 <= item.quantity) {
                dispatch(changeQty(item._id, ++item.count));
              }
            }}
          />

          {/* Delete button */}
          <Popconfirm
            placement="top"
            title={`Delete ${item.title}`}
            onConfirm={() => dispatch(removeProduct(item._id))}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              shape="circle"
              size="small"
              icon={<DeleteOutlined />}
              className="drawer__item__action--delete"
            />
          </Popconfirm>
        </div>
      ))}

      {/* Go to cart */}
      <Link to="/cart">
        <Button
          onClick={() => dispatch(closeDrawr())}
          type="primary"
          className="drawer__to-cart"
          icon={<ShoppingCartOutlined />}
        >
          Go to cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default _Drawer;
