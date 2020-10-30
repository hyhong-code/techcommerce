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
  SIMILAR_PRODUCTS_LISTED,
  SIMILAR_PRODUCTS_CLEARED,
  PRODUCTS_BY_CATEOGRY_LISTED,
  PRODUCTS_BY_CATEGORY_CLEARED,
  PRODUCTS_BY_SUBS_LISTED,
  PRODUCTS_BY_SUBS_CLEARED,
  FILTERED_PRODUCTS_LISTED,
  FILTERED_PRODUCTS_CLEARED,
} from "../actions";

const INITIAL_STATE = {
  products: [],
  productCount: 0,
  latestArrivals: [],
  latestArrivalsLoading: true,
  bestSellings: [],
  bestSellingsLoading: true,
  listProductsLoading: false,
  currentProduct: null,
  currentProductLoading: true,
  similarProducts: [],
  similarProductsLoading: true,
  productsByCategory: [],
  productsByCategoryLoading: true,
  productsBySubs: [],
  productsBySubsLoading: true,
  filterProducts: [],
  filterProductsLoading: true,
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
        products: payload.products,
        productCount: payload.count,
        listProductsLoading: false,
      };

    case LIST_BEST_SELLINGS:
      return {
        ...state,
        bestSellings: payload.products,
        productCount: payload.count,
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
        latestArrivals: payload.products,
        productCount: payload.count,
        latestArrivalsLoading: false,
      };

    case CLEAR_NEW_ARRIVALS:
      return {
        ...state,
        latestArrivals: [],
        latestArrivalsLoading: true,
      };

    case SIMILAR_PRODUCTS_LISTED:
      return {
        ...state,
        similarProducts: payload,
        similarProductsLoading: false,
      };

    case SIMILAR_PRODUCTS_CLEARED:
      return {
        ...state,
        similarProducts: [],
        similarProductsLoading: true,
      };

    case PRODUCTS_BY_CATEOGRY_LISTED:
      return {
        ...state,
        productsByCategory: payload,
        productsByCategoryLoading: false,
      };

    case PRODUCTS_BY_CATEGORY_CLEARED:
      return {
        ...state,
        productsByCategory: [],
        productsByCategoryLoading: true,
      };

    case PRODUCTS_BY_SUBS_LISTED:
      return {
        ...state,
        productsBySubs: payload,
        productsBySubsLoading: false,
      };

    case PRODUCTS_BY_SUBS_CLEARED:
      return {
        ...state,
        productsBySubs: [],
        productsBySubsLoading: true,
      };

    case FILTERED_PRODUCTS_LISTED:
      return {
        ...state,
        filterProducts: payload,
        filterProductsLoading: false,
      };

    case FILTERED_PRODUCTS_CLEARED:
      return {
        ...state,
        productsBySubs: [],
        productsBySubsLoading: true,
      };

    default:
      return state;
  }
};
