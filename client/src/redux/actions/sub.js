import axios from "axios";

import {
  SUB_CREATED,
  SUB_FETCHED,
  SUB_UPDATED,
  SUB_DELETED,
  SUB_LISTED,
} from "../actions";

export const createSub = (categorySlug, name) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/categories/${categorySlug}/subs`,
      { name }
    );

    dispatch({
      type: SUB_CREATED,
      payload: res.data.sub,
    });
  } catch (error) {
    console.error(`[❌ createSub]`, error);
    throw error;
  }
};

export const getSub = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/subs/${slug}`);

    dispatch({
      type: SUB_FETCHED,
      payload: res.data.sub,
    });
  } catch (error) {
    console.error(`[❌ getSub]`, error);
    throw error;
  }
};

export const updateSub = (oldSub, newName) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/subs/${oldSub.slug}`,
      { name: newName }
    );

    dispatch({
      type: SUB_UPDATED,
      payload: {
        id: oldSub._id,
        newSub: res.data.sub,
      },
    });
  } catch (error) {
    console.error(`[❌ updateSub]`, error);
    throw error;
  }
};

export const deleteSub = (slug) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/subs/${slug}`);

    dispatch({
      type: SUB_DELETED,
      payload: slug,
    });
  } catch (error) {
    console.error(`[❌ updateSub]`, error);
    throw error;
  }
};

export const listSubs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/subs`);

    dispatch({
      type: SUB_LISTED,
      payload: res.data.subs,
    });
  } catch (error) {
    console.error(`[❌ listSubs]`, error);
    throw error;
  }
};
