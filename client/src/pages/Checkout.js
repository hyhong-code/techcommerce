import React, { useEffect } from "react";
import { Input, Button, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getCart, clearCartPrice } from "../redux/actions/cart";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, cartTotal, totalAfterDiscount } = useSelector(
    ({ cart }) => cart
  );

  useEffect(() => {
    dispatch(getCart());
    return () => {
      dispatch(clearCartPrice());
    };
  }, [dispatch]);

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
        <h1>Order Summary</h1>

        <p>Products</p>

        <Divider />

        <p>Products list</p>

        <Divider />

        <p>Total</p>

        <div className="checkout__right__actions">
          <Button>Place Order</Button>
          <Button>Empty Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
