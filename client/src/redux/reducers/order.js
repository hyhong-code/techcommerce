import { ORDER_CREATED, USER_ORDERS_LISTED, ADMIN_ORDERS_LISTED, ORDER_UPDATED } from "../actions";

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

    case ORDER_UPDATED:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== payload._id),
      };

    default:
      return state;
  }
};
