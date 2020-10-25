import {
  PRODUCT_CREATED,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
  PRODUCTS_LISTED,
  CLEAR_EDITING_PRODUCT,
  SET_UPDATE_LOADING,
  CLEAR_UPDATE_LOADING,
} from "../actions";

const INITIAL_STATE = {
  products: [],
  currentUpdatingProduct: null,
  currentUpdatingLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATED:
      return {
        ...state,
        products: [payload, ...state.products],
      };

    case PRODUCT_FETCHED:
      return {
        ...state,
        currentUpdatingProduct: payload,
      };

    case PRODUCT_UPDATED:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload._id ? payload : product
        ),
        currentUpdatingProduct: payload,
      };

    case CLEAR_EDITING_PRODUCT:
      return {
        ...state,
        currentUpdatingProduct: null,
      };

    case SET_UPDATE_LOADING:
      return {
        ...state,
        currentUpdatingLoading: true,
      };

    case CLEAR_UPDATE_LOADING:
      return {
        ...state,
        currentUpdatingLoading: false,
      };

    case PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.filter((product) => product.slug !== payload),
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
