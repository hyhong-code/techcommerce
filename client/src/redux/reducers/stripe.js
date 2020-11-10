import { INTENT_CREATED } from "../actions";

const INITIAL_STATE = {
  clientSecret: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case INTENT_CREATED:
      return {
        ...state,
        clientSecret: payload,
      };

    default:
      return state;
  }
};
