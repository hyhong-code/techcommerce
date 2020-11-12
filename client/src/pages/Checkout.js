import React, { Fragment, useEffect, useState } from "react";
import { Input, Button, Divider, message, Tooltip, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DollarCircleOutlined, ClearOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";

import { updateUserAddress } from "../redux/actions/user";
import { getCart, clearCartPrice, clearCart, applyCoupon } from "../redux/actions/cart";
import { createOrder } from "../redux/actions/order";
import formatErrorMsg from "../utils/formatErrorMsg";
import SEOHead from "../components/SEOHead";

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [saveAddressLoading, setAddressLoading] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [
    { cart, cartTotal, totalAfterDiscount, isCashOnDelivery },
    { user },
  ] = useSelector(({ cart, user }) => [cart, user]);
  const [couponCode, setCouponCode] = useState("");
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);

  // Fetach cart onload, clean up on leave
  useEffect(() => {
    dispatch(getCart());
    return () => {
      dispatch(clearCartPrice());
    };
  }, [dispatch]);

  // Pre-fill user's address
  useEffect(() => {
    if (user && user.address) {
      setAddress(user.address);
    }
  }, [user, setAddress]);

  // Clear cart from localStorage, redux, and DB
  const handleClearCart = async () => {
    setClearCartLoading(true);
    try {
      await dispatch(clearCart());
      message.success("Cart is cleared, please continue shopping.", 6);
      setClearCartLoading(false);
      history.push("/shop");
    } catch (error) {
      message.error(error.message, 6);
      setClearCartLoading(false);
    }
  };

  // Update address
  const handleUpdateAddress = async () => {
    setAddressLoading(true);
    try {
      await dispatch(updateUserAddress(address));
      setAddressConfirmed(true);
      message.success("Address confirmed.", 6);
    } catch (error) {
      message.error(error.message, 6);
    }
    setAddressLoading(false);
  };

  // Apply coupon
  const handleApplyCoupon = async (evt) => {
    evt.preventDefault();

    // Handle no coupon code
    if (!couponCode) {
      return message.error("No coupon code entered", 6);
    }

    setApplyCouponLoading(true);
    try {
      await dispatch(applyCoupon(couponCode));
      message.success(`Coupon ${couponCode} has been applied.`);
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
    setApplyCouponLoading(false);
  };

  // Returns whether coupon is applied for the cart
  const isCouponApplied = () => Number(totalAfterDiscount) < Number(cartTotal);

  // Place a card order or cash on delivery order
  const handlePlaceOrder = async () => {
    if (!isCashOnDelivery) {
      history.push("/payment");
    } else {
      try {
        await dispatch(createOrder());
        message.success("Order successfully created!", 6);
        history.push("/user/history");
      } catch (error) {
        message.error(formatErrorMsg(error), 6);
      }
    }
  };

  return (
    <div className="checkout">
      <SEOHead title={`Checkout | ${process.env.REACT_APP_APP_NAME}`} />

      {/* Left side */}
      <div className="checkout__left">
        {/* Address */}
        <h2 className="checkout__left__address">Delivery Address</h2>

        {/* Address rich text editor */}
        <ReactQuill
          value={address}
          onChange={(v) => {
            setAddressConfirmed(false);
            setAddress(v);
          }}
          placeholder="Please create an address."
        />

        <Button
          onClick={handleUpdateAddress}
          loading={saveAddressLoading}
          disabled={addressConfirmed}
        >
          Confirm address
        </Button>

        <Divider />

        {/* Coupon */}
        <h2 className="checkout__left__coupon">Got Coupon?</h2>
        <form onSubmit={handleApplyCoupon}>
          <Input
            placeholder={
              isCouponApplied() ? "A coupon has been applied." : "Enter a coupon code..."
            }
            value={couponCode}
            disabled={applyCouponLoading || isCouponApplied()}
            onChange={(evt) => setCouponCode(evt.target.value)}
            className="checkout__left__coupon-input"
          />
          <Button
            htmlType="submit"
            disabled={!couponCode || isCouponApplied()}
            loading={applyCouponLoading}
          >
            Apply coupon
          </Button>
        </form>
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

        {/* Total */}
        <p className="checkout__right__subtitle">Total:</p>
        {isCouponApplied() && (
          <Fragment>
            {/* Discount */}
            <p className="checkout__right__cart-total">${cartTotal}</p>
            <p className="checkout__right__subtitle">Total after discount:</p>
          </Fragment>
        )}
        <p className="checkout__right__cart-total--alt">${totalAfterDiscount}</p>

        <div className="checkout__right__actions">
          {/* Clear cart */}
          <Popconfirm onConfirm={handleClearCart} okText="Clear" title="Clear shopping cart?">
            <Button icon={<ClearOutlined />} loading={clearCartLoading}>
              Empty Cart
            </Button>
          </Popconfirm>

          {/* Place order */}
          <Tooltip
            title={
              !addressConfirmed
                ? "Please confirm your address."
                : !Object.keys(cart).length && "Please add some items to cart first"
            }
          >
            <Button
              type="primary"
              icon={<DollarCircleOutlined />}
              disabled={!addressConfirmed || !Object.keys(cart).length}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
