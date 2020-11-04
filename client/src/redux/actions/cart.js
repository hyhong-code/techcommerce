import axios from "axios";
import {
  ADDED_TO_CART,
  COLOR_CHANGED,
  GET_CART,
  QTY_CHANGED,
  REMOVE_PRODUCT,
  CLEAR_CART_PRICE,
  CLEAR_CART,
} from "../actions";

export const addToCart = (product) => async (dispatch, getState) => {
  const { cart } = await getState().cart;

  // Only save to cart if not already in cart
  if (!cart[product._id]) {
    dispatch({
      type: ADDED_TO_CART,
      payload: product,
    });
  }
};

export const changeQty = (id, newQty) => async (dispatch) => {
  dispatch({
    type: QTY_CHANGED,
    payload: {
      id,
      newQty,
    },
  });
};

export const changeColor = (id, newColor) => async (dispatch) => {
  dispatch({
    type: COLOR_CHANGED,
    payload: {
      id,
      newColor,
    },
  });
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: id,
  });
};

export const saveCart = () => async (dispatch, getState) => {
  try {
    const { cart } = await getState().cart;
    await axios.put(`${process.env.REACT_APP_API}/carts`, { cart });
  } catch (error) {
    console.error(`[❌ saveCart]`, error);
    throw error;
  }
};

export const getCart = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/carts`);
    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (error) {
    console.error(`[❌ getCart]`, error);
    throw error;
  }
};

export const clearCartPrice = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART_PRICE,
  });
};

export const clearCart = () => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/carts`);
    dispatch({
      type: CLEAR_CART,
    });
  } catch (error) {
    console.error(`[❌ clearCart]`, error);
    throw error;
  }
};
