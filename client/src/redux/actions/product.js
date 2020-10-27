import axios from "axios";

import {
  PRODUCT_CREATED,
  PRODUCT_DELETED,
  PRODUCT_FETCHED,
  PRODUCTS_LISTED,
  SET_LIST_PRODUCTS_LOADING,
  PRODUCT_UPDATED,
  CLEAR_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_LOADING,
  LIST_BEST_SELLINGS,
  CLEAR_BEST_SELLINGS,
  LIST_NEW_ARRIVALS,
  CLEAR_NEW_ARRIVALS,
} from "../actions";

export const createProduct = (formdata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/products`,
      formdata
    );
    dispatch({
      type: PRODUCT_CREATED,
      payload: res.data.product,
    });
  } catch (error) {
    console.error(`[❌ createProduct]`, error);
    throw error;
  }
};

export const getProduct = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/products/${slug}`
    );

    dispatch({
      type: PRODUCT_FETCHED,
      payload: res.data.product,
    });
  } catch (error) {
    console.error(`[❌ getProduct]`, error);
    throw error;
  }
};

export const deleteProduct = (slug) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`);
    dispatch({
      type: PRODUCT_DELETED,
      payload: slug,
    });
  } catch (error) {
    console.error(`[❌ deleteProduct]`, error);
    throw error;
  }
};

export const updateProduct = (slug, formdata) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/products/${slug}`,
      formdata
    );

    dispatch({
      type: PRODUCT_UPDATED,
      payload: res.data.product,
    });
  } catch (error) {
    console.error(`[❌ updateProduct]`, error);
    throw error;
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LIST_PRODUCTS_LOADING });

    const res = await axios.get(`${process.env.REACT_APP_API}/products`);

    dispatch({
      type: PRODUCTS_LISTED,
      payload: {
        products: res.data.products,
        count: res.data.count,
      },
    });
  } catch (error) {
    console.error(`[❌ listProducts]`, error);
    throw error;
  }
};

export const listBestSellings = (limit = 10) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/products?type=best-selling&order=desc&limit=${limit}`
    );

    dispatch({
      type: LIST_BEST_SELLINGS,
      payload: {
        products: res.data.products,
        count: res.data.count,
      },
    });
  } catch (error) {
    console.error(`[❌ listBestSellings]`, error);
    throw error;
  }
};

export const clearBestSellings = () => (dispatch) => {
  dispatch({ type: CLEAR_BEST_SELLINGS });
};

export const listNewArrival = (limit = 10) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/products?type=new-arrival&order=desc&limit=${limit}`
    );

    dispatch({
      type: LIST_NEW_ARRIVALS,
      payload: {
        products: res.data.products,
        count: res.data.count,
      },
    });
  } catch (error) {
    console.error(`[❌ listNewArrival]`, error);
    throw error;
  }
};

export const clearNewArrivals = () => (dispatch) => {
  dispatch({ type: CLEAR_NEW_ARRIVALS });
};

export const leaveCurrentProduct = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_PRODUCT,
  });
  dispatch({
    type: SET_CURRENT_PRODUCT_LOADING,
  });
};
