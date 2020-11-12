import React, { Fragment, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { message, Row, Col, Statistic, Alert } from "antd";
import { DollarCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { createPaymentIntent, paymentComplete } from "../redux/actions/stripe";
import { createOrder } from "../redux/actions/order";
import SEOHead from "../components/SEOHead";

// Card styles
const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { clientSecret } = useSelector(({ stripe }) => stripe);

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [paid, setPaid] = useState(false);

  // Get client secret on load
  useEffect(() => {
    (async () => {
      try {
        await dispatch(createPaymentIntent());
      } catch (error) {
        message.error(error.message, 6);
        history.goBack();
      }
    })();

    return () => {
      dispatch(paymentComplete());
    };
  }, [dispatch, history]);

  // Submit payment
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {},
        },
      });

      // Handle error
      if (error) throw error;

      // Create order then clear cart
      await dispatch(createOrder(paymentIntent));

      // Payment success
      setPaid(true);
      setError(false);
      message.success("Your payment was successful.", 8);
    } catch (error) {
      setError(error.message);
    }
    setProcessing(false);
  };

  // Handle card input change
  const handleChange = (evt) => {
    setDisabled(evt.empty);
    setError(typeof evt.error === "object" ? evt.error.message : "");
  };

  return (
    <Fragment>
      <SEOHead
        title={`Payment | ${process.env.REACT_APP_APP_NAME}`}
        description="Complete your order."
      />

      {/* Stripe form */}
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        {/* Stripe card input */}
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

        {/* Stripe pay button */}
        <button
          className="stripe-button"
          disabled={!clientSecret || disabled || error || processing || paid}
        >
          {/* Loading spinner */}
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>

        {/* Error alert */}
        {error && (
          <div id="card-error" role="alert">
            {error}
          </div>
        )}
      </form>

      {/* Payment success message */}
      {paid ? (
        <p className="result-message">
          Your payment was successfull.{" "}
          <Link to="/user/history">Go to your order history &rarr;</Link>
        </p>
      ) : (
        <Fragment>
          {/* Demo payment instructions */}
          <p className="result-message--alt">
            Please use Stripe demo card number: <span>4242 4242 4242 4242</span>
            <br />
            Along with any random MM/YY, CVC, and zip code.
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default () => {
  const { cartTotal, totalAfterDiscount } = useSelector(({ stripe }) => stripe);

  return (
    <div className="payment">
      {/* Need to wrap Elemetns provider around useStripe calls */}
      <Elements stripe={stripePromise}>
        <h1 className="payment__title">Complete your purchase</h1>

        {/* Statistics */}
        <div className="payment__stats">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Subtotal"
                value={`$${cartTotal}`}
                prefix={<DollarCircleOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Final Payable"
                value={`$${totalAfterDiscount}`}
                prefix={<CheckCircleOutlined />}
              />
            </Col>
          </Row>
        </div>

        {/* Coupon Alert */}
        {Number(totalAfterDiscount) < Number(cartTotal) && (
          <Alert
            className="payment__alert"
            message={`$${Number(cartTotal) - Number(totalAfterDiscount)} coupon applied!`}
            type="success"
          />
        )}

        {/* Payment form */}
        <PaymentForm />
      </Elements>
    </div>
  );
};
