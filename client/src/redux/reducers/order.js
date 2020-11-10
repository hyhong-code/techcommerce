import { ORDER_CREATED, USER_ORDERS_LISTED, ADMIN_ORDERS_LISTED } from "../actions";

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

    case USER_ORDERS_LISTED:
    case ADMIN_ORDERS_LISTED:
      return {
        ...state,
        orders: payload,
      };

    default:
      return state;
  }
};
