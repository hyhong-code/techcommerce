import axios from "axios";

import { ORDER_CREATED } from "../actions";
import { clearCart } from "./cart";

export const createOrder = (paymentIntent) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/orders`, {
      paymentIntent,
    });

    dispatch({
      type: ORDER_CREATED,
      payload: res.data.order,
    });

    // Empty user's cart from DB and localStorage
    await dispatch(clearCart());
  } catch (error) {
    console.error(`[❌ createOrder]`, error);
    throw error;
  }
};
