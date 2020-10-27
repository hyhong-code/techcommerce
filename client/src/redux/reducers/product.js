import {
  PRODUCT_CREATED,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
  PRODUCTS_LISTED,
  CLEAR_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_LOADING,
  SET_LIST_PRODUCTS_LOADING,
  LIST_BEST_SELLINGS,
  LIST_NEW_ARRIVALS,
  CLEAR_BEST_SELLINGS,
  CLEAR_NEW_ARRIVALS,
} from "../actions";

const INITIAL_STATE = {
  products: [],
  latestArrivals: [],
  latestArrivalsLoading: true,
  bestSellings: [],
  bestSellingsLoading: true,
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

    case LIST_BEST_SELLINGS:
      return {
        ...state,
        bestSellings: payload,
        bestSellingsLoading: false,
      };

    case CLEAR_BEST_SELLINGS:
      return {
        ...state,
        bestSellings: [],
        bestSellingsLoading: true,
      };

    case LIST_NEW_ARRIVALS:
      return {
        ...state,
        latestArrivals: payload,
        latestArrivalsLoading: false,
      };

    case CLEAR_NEW_ARRIVALS:
      return {
        ...state,
        latestArrivals: [],
        latestArrivalsLoading: true,
      };

    default:
      return state;
  }
};
