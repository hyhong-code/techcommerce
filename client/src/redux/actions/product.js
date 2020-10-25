import axios from "axios";

import {
  PRODUCT_CREATED,
  PRODUCT_DELETED,
  PRODUCT_FETCHED,
  PRODUCTS_LISTED,
  PRODUCT_UPDATED,
} from "../actions";

export const createProduct = (formdata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/products`,
      formdata
    );
    console.log(res.data.product);
    dispatch({
      type: PRODUCT_CREATED,
      payload: res.data.product,
    });
  } catch (error) {
    throw error;
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/products`);

    console.log(res.data.products);

    dispatch({
      type: PRODUCTS_LISTED,
      payload: res.data.products,
    });
  } catch (error) {
    throw error;
  }
};
