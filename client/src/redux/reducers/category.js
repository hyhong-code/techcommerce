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
      return { ...state, categories: [...state.categories, payload] };
    case CATEGORY_UPDATED:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.slug === payload.slug ? payload : category
        ),
      };
    case CATEGORY_DELETED:
      return {
        ...state,
        categoreis: state.categories.filter(
          (category) => category.slug !== payload
        ),
      };
    default:
      return state;
  }
};
