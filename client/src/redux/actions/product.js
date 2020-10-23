import axios from "axios";

import {
  PRODUCT_CREATED,
  PRODUCT_DELETED,
  PRODUCT_FETCHED,
  PRODUCT_LISTED,
  PRODUCT_UPDATED,
  IMAGE_PREVIEWED,
  IMAGE_PREVIEW_CANCELED,
  IMAGE_LIST_CHANGED,
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
