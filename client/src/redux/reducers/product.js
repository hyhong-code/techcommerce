import {
  PRODUCT_CREATED,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
  PRODUCTS_LISTED,
} from "../actions";

const INITIAL_STATE = {
  products: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATED:
      return {
        ...state,
        products: [payload, ...state.products],
      };
    case PRODUCTS_LISTED:
      return {
        ...state,
        products: payload,
      };

    default:
      return state;
  }
};
