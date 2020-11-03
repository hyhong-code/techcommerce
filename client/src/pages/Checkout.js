import React from "react";
import { Input, Button, Divider } from "antd";

const Checkout = () => {
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
