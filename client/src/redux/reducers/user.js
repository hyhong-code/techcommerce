import { USER_LOADED, USER_LOGGED_OUT } from "../actions";

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload };
    case USER_LOGGED_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
