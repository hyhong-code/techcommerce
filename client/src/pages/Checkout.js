import React, { useEffect } from "react";
import { Input, Button, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DollarCircleOutlined, ClearOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { getCart, clearCartPrice, clearCart } from "../redux/actions/cart";

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart, cartTotal, totalAfterDiscount } = useSelector(
    ({ cart }) => cart
  );

  useEffect(() => {
    dispatch(getCart());
    return () => {
      dispatch(clearCartPrice());
    };
  }, [dispatch]);

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart());
      history.push("/shop");
      message.success("Cart is cleared, please continue shopping.", 6);
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  return (
    <div className="checkout">
      {/* Left side */}
      <div className="checkout__left">
        {/* Address */}
        <h2>Delivery Address</h2>
        <Input.TextArea />
        <Button>Save</Button>

        <Divider />

        {/* Coupon */}
        <h2>Got Coupon?</h2>
        <Input />
        <Button>Apply coupon</Button>
      </div>

      {/* Right side */}
      <div className="checkout__right">
        <h1 className="checkout__right__title">Order Summary</h1>

        <Divider />

        <p className="checkout__right__subtitle">Products:</p>

        {/* Checkout items */}
        {Object.values(cart).map((product) => (
          <p key={product._id} className="checkout__right__product-item">
            {product.title} (${product.price}) x {product.count} =
            <span> ${(product.price * product.count).toFixed(2)}</span>
          </p>
        ))}

        <Divider />

        <p className="checkout__right__subtitle">Total:</p>
        <p className="checkout__right__cart-total">${cartTotal}</p>

        <div className="checkout__right__actions">
          <Button icon={<ClearOutlined />} onClick={handleClearCart}>
            Empty Cart
          </Button>
          <Button type="primary" icon={<DollarCircleOutlined />}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
