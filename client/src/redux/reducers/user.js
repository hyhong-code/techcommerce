import { USER_LOADED, USER_LOGGED_OUT, UPDATE_ADDRESS, ADDED_TO_WISHLIST } from "../actions";

const INITIAL_STATE = {
  user: null,
  isInitializing: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case ADDED_TO_WISHLIST:
      return { ...state, user: payload, isInitializing: false };

    case USER_LOGGED_OUT:
      return { ...state, user: null, isInitializing: false };

    case UPDATE_ADDRESS:
      return { ...state, user: payload };

    default:
      return state;
  }
};
