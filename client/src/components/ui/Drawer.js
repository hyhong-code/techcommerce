import React from "react";
import { Drawer, Image, Badge, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { closeDrawr } from "../../redux/actions/drawer";

const _Drawer = () => {
  const dispatch = useDispatch();
  const [{ visible }, { cart }] = useSelector(({ drawer, cart }) => [
    drawer,
    cart,
  ]);

  return (
    <Drawer
      visible={visible}
      onClose={() => dispatch(closeDrawr())}
      className="drawer"
    >
      {Object.values(cart).map((item) => (
        <Badge.Ribbon
          key={item._id}
          text={`${item.title} * ${item.count} - $${(
            item.price * item.count
          ).toFixed(2)}`}
        >
          {/* Product images */}
          <Image
            src={item.images[0].url}
            alt={item.title}
            className="drawer__image"
          />
        </Badge.Ribbon>
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
