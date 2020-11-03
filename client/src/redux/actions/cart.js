import {
  ADDED_TO_CART,
  COLOR_CHANGED,
  QTY_CHANGED,
  REMOVE_PRODUCT,
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
