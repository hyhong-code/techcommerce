import React, { Fragment, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { message } from "antd";

import { createPaymentIntent } from "../redux/actions/stripe";

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

      console.log("error--->", error);
      console.log("paymentIntent--->", paymentIntent);

      // Handle error
      if (error) throw error;

      // Payment success
      setPaid(true);
      setError(false);
      message.success("Your payment was successful.", 8);

      // Clear cart

      // Create order
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
      {paid && (
        <p className="result-message">
          Your payment was successfull.{" "}
          <Link to="/user/history">Go to your order history &rarr;</Link>
        </p>
      )}
    </Fragment>
  );
};

export default () => (
  <div className="payment">
    {/* Need to wrap Elemetns provider around useStripe calls */}
    <Elements stripe={stripePromise}>
      <h1 className="payment__title">Complete your purchase</h1>
      {/* Payment form */}
      <PaymentForm />
    </Elements>
  </div>
);
