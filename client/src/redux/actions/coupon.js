import axios from "axios";

import { COUPON_CREATED, COUPON_DELETED, COUPON_LISTED } from "../actions";

export const createCoupon = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/coupons`, formData);

    dispatch({
      type: COUPON_CREATED,
      payload: res.data.coupon,
    });
  } catch (error) {
    console.error("[❌ createCoupon ERROR]", error);
    throw error;
  }
};

export const listCoupons = () => async (disaptch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/coupons`);

    disaptch({
      type: COUPON_LISTED,
      payload: res.data.coupons,
    });
  } catch (error) {
    console.error("[❌ listCoupons ERROR]", error);
    throw error;
  }
};

export const deleteCoupon = (code) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/coupons/${code}`);

    dispatch({
      type: COUPON_DELETED,
      payload: code,
    });
  } catch (error) {
    console.error("[❌ deleteCoupon ERROR]", error);
    throw error;
  }
};
