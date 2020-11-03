import { CLOSE_DRAWER, OPEN_DRAWER } from "../actions";

const INITIAL_STATE = {
  visible: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };

    case CLOSE_DRAWER:
      return { ...state, visible: false };

    default:
      return state;
  }
};
