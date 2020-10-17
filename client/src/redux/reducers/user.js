import { AUTH_ERROR, USER_LOADED, USER_LOGGED_OUT } from "../actions";

const INITIAL_STATE = {
  user: null,
  isInitializing: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload, isInitializing: false };
    case USER_LOGGED_OUT:
      return { ...state, user: null };
    case AUTH_ERROR:
      return { ...state, user: null, isInitializing: false };
    default:
      return state;
  }
};
