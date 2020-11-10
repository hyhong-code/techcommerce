import axios from "axios";

import { INTENT_CREATED, PAYMENT_COMPLETE } from "../actions";

export const createPaymentIntent = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/stripe`);
    console.log(res.data.clientSecret);

    dispatch({
      type: INTENT_CREATED,
      payload: res.data,
    });
  } catch (error) {
    console.error("❌ [createPaymentIntent ERROR]");
    throw error;
  }
};

export const paymentComplete = () => async (dispatch) => {
  dispatch({
    type: PAYMENT_COMPLETE,
  });
};
