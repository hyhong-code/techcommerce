import { ADDED_TO_CART } from "../actions";

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
