import {
  CATEGORY_LISTED,
  CATEGORY_CREATED,
  CATEGORY_UPDATED,
  CATEGORY_DELETED,
} from "../actions";

const INITIAL_STATE = {
  categories: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_LISTED:
      return { ...state, categories: payload };
    case CATEGORY_CREATED:
      return { ...state, categories: [payload, ...state.categories] };
    case CATEGORY_UPDATED:
      const { id, newCategory } = payload;
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === id ? newCategory : category
        ),
      };
    case CATEGORY_DELETED:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.slug !== payload
        ),
      };
    default:
      return state;
  }
};
