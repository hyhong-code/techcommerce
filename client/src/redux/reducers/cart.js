import { ADDED_TO_CART } from "../actions";

// Re-hydrate cart from local storage or init as empty object
const getInitialCart = () =>
  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};

const INITIAL_STATE = {
  cart: getInitialCart(),
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADDED_TO_CART:
      // Save cart to localStorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state.cart,
          [payload._id]: {
            ...payload,
            count: 1,
          },
        })
      );

      // Return new redux state
      return {
        ...state,
        cart: {
          ...state.cart,
          [payload._id]: {
            ...payload,
            count: 1,
          },
        },
      };

    default:
      return state;
  }
};
