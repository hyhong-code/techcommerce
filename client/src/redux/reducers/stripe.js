import { INTENT_CREATED, PAYMENT_COMPLETE } from "../actions";

const INITIAL_STATE = {
  clientSecret: null,
  cartTotal: 0,
  totalAfterDiscount: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case INTENT_CREATED:
      return {
        ...state,
        clientSecret: payload.clientSecret,
        cartTotal: payload.cartTotal,
        totalAfterDiscount: payload.totalAfterDiscount,
      };

    case PAYMENT_COMPLETE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
