import { COUPON_CREATED, COUPON_LISTED, COUPON_DELETED } from "../actions";

const INITIAL_STATE = {
  coupons: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case COUPON_LISTED:
      return {
        ...state,
        coupons: payload,
      };

    case COUPON_CREATED:
      return {
        ...state,
        coupons: [payload, ...state.coupons],
      };

    case COUPON_DELETED:
      return {
        ...state,
        coupons: state.coupons.filter((coupon) => coupon.code !== payload),
      };

    default:
      return state;
  }
};
