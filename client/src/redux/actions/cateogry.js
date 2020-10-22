import axios from "axios";

import {
  CATEGORY_CREATED,
  CATEGORY_DELETED,
  CATEGORY_LISTED,
  CATEGORY_UPDATED,
  CATEGORY_FETCHED,
} from "../actions/index";

export const createCategory = (name) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/categories`, {
      name,
    });
    console.log(res.data.category);
    dispatch({
      type: CATEGORY_CREATED,
      payload: res.data.category,
    });
  } catch (error) {
    console.error(`[❌ createCategory]`, error);
    throw error;
  }
};

export const fetchCategory = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/categories/${slug}`
    );
    dispatch({
      type: CATEGORY_FETCHED,
      payload: res.data.category,
    });
  } catch (error) {
    console.error(`[❌ fetchCategory]`, error);
    throw error;
  }
};

export const updateCategory = (oldCategory, newName) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/categories/${oldCategory.slug}`,
      { name: newName }
    );
    dispatch({
      type: CATEGORY_UPDATED,
      payload: {
        id: oldCategory._id,
        newCategory: res.data.category,
      },
    });
  } catch (error) {
    console.error(`[❌ updateCategory]`, error);
    throw error;
  }
};

export const deleteCategory = (slug) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`);
    dispatch({
      type: CATEGORY_DELETED,
      payload: slug,
    });
  } catch (error) {
    console.error(`[❌ deleteCategory]`, error);
    throw error;
  }
};

export const listCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
    console.log(res.data.categories);
    dispatch({
      type: CATEGORY_LISTED,
      payload: res.data.categories,
    });
  } catch (error) {
    console.error(`[❌ listCategories]`, error);
    throw error;
  }
};
