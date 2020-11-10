import axios from "axios";

import { ORDER_CREATED, USER_ORDERS_LISTED, ADMIN_ORDERS_LISTED } from "../actions";
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

export const listUserOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/orders/me`);

    dispatch({
      type: USER_ORDERS_LISTED,
      payload: res.data.orders,
    });
  } catch (error) {
    console.error(`[❌ listUserOrders]`, error);
    throw error;
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/orders`);

    dispatch({
      type: ADMIN_ORDERS_LISTED,
      payload: res.data.orders,
    });
  } catch (error) {
    console.error(`[❌ listOrders]`, error);
    throw error;
  }
};

export const updateOrderStatus = () => async (dispatch) => {
  try {
  } catch (error) {
    console.error(`[❌ updateOrderStatus]`, error);
    throw error;
  }
};
