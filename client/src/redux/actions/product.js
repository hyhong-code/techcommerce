import axios from "axios";

import {
  PRODUCT_CREATED,
  PRODUCT_DELETED,
  PRODUCT_FETCHED,
  PRODUCTS_LISTED,
  PRODUCT_UPDATED,
  CLEAR_EDITING_PRODUCT,
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
    throw error;
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/products`);

    dispatch({
      type: PRODUCTS_LISTED,
      payload: res.data.products,
    });
  } catch (error) {
    throw error;
  }
};

export const clearEditingProduct = () => (dispatch) => {
  dispatch({
    type: CLEAR_EDITING_PRODUCT,
  });
};
