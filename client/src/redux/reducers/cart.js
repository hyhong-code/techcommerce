import {
  ADDED_TO_CART,
  COLOR_CHANGED,
  QTY_CHANGED,
  REMOVE_PRODUCT,
} from "../actions";

// Re-hydrate cart from local storage or init as empty object
const getInitialCart = () =>
  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};

const INITIAL_STATE = {
  cart: getInitialCart(),
};

const storeCartToLocalStorage = (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart));
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  let newCart;
  switch (type) {
    case ADDED_TO_CART:
      newCart = {
        ...state,
        cart: {
          ...state.cart,
          [payload._id]: {
            ...payload,
            count: 1,
          },
        },
      };

      storeCartToLocalStorage(newCart.cart);
      return newCart;

    case QTY_CHANGED:
      newCart = {
        ...state,
        cart: {
          ...state.cart,
          [payload.id]: {
            ...state.cart[payload.id],
            count: payload.newQty,
          },
        },
      };

      storeCartToLocalStorage(newCart.cart);
      return newCart;

    case COLOR_CHANGED:
      newCart = {
        ...state,
        cart: {
          ...state.cart,
          [payload.id]: {
            ...state.cart[payload.id],
            color: payload.newColor,
          },
        },
      };

      storeCartToLocalStorage(newCart.cart);
      return newCart;

    case REMOVE_PRODUCT:
      const { [payload]: removed, ...filteredCart } = state.cart;
      newCart = {
        ...state,
        cart: filteredCart,
      };
      storeCartToLocalStorage(newCart.cart);
      return newCart;

    default:
      return state;
  }
};
