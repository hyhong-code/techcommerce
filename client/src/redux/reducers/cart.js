import {
  ADDED_TO_CART,
  COLOR_CHANGED,
  QTY_CHANGED,
  REMOVE_PRODUCT,
  GET_CART,
  CLEAR_CART_PRICE,
  CLEAR_CART,
  APPLY_COUPON,
  SET_PAYMENT_METHOD,
} from "../actions";

// Re-hydrate cart from local storage or init as empty object
const getInitialCart = () =>
  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};

const INITIAL_STATE = {
  cart: getInitialCart(),
  cartTotal: 0,
  totalAfterDiscount: 0,
  isCashOnDelivery: false,
};

const storeCartToLocalStorage = (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart));
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  let newCart;
  switch (type) {
    // Add to cart
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

    // Change quantity
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

    // Change color
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

    // Remove item from cart
    case REMOVE_PRODUCT:
      const { [payload]: removed, ...filteredCart } = state.cart;
      newCart = {
        ...state,
        cart: filteredCart,
      };
      storeCartToLocalStorage(newCart.cart);
      return newCart;

    // Get cart from DB | Get cart after applying coupon
    case GET_CART:
    // falls through
    case APPLY_COUPON:
      storeCartToLocalStorage(payload.products);
      return {
        ...state,
        cart: payload.products,
        cartTotal: payload.cartTotal || 0,
        totalAfterDiscount: payload.totalAfterDiscount || 0,
      };

    // Clear cart price
    case CLEAR_CART_PRICE:
      return {
        ...state,
        cartTotal: 0,
        totalAfterDiscount: 0,
      };

    // Clear cart
    case CLEAR_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: getInitialCart(),
        cartTotal: 0,
        totalAfterDiscount: 0,
        isCashOnDelivery: false,
      };

    // Set Payment Method
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        isCashOnDelivery: payload,
      };

    default:
      return state;
  }
};
