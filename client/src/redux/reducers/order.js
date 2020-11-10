import { ORDER_CREATED } from "../actions";

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATED:
      return {
        ...state,
        orders: [payload, ...state.orders],
      };

    default:
      return state;
  }
};
