import {
  PRODUCT_CREATED,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
  PRODUCTS_LISTED,
  CLEAR_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_LOADING,
  SET_LIST_PRODUCTS_LOADING,
} from "../actions";

const INITIAL_STATE = {
  products: [],
  listProductsLoading: false,
  currentProduct: null,
  currentProductLoading: true,
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
        currentProduct: payload,
        currentProductLoading: false,
      };

    case PRODUCT_UPDATED:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload._id ? payload : product
        ),
        currentProduct: payload,
      };

    case CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: null,
      };

    case SET_CURRENT_PRODUCT_LOADING:
      return {
        ...state,
        currentProductLoading: true,
      };

    case PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.filter((product) => product.slug !== payload),
      };

    case SET_LIST_PRODUCTS_LOADING:
      return {
        ...state,
        listProductsLoading: true,
      };

    case PRODUCTS_LISTED:
      return {
        ...state,
        products: payload,
        listProductsLoading: false,
      };

    default:
      return state;
  }
};
