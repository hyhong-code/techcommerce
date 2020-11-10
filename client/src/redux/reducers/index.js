import { combineReducers } from "redux";

import user from "./user";
import category from "./category";
import sub from "./sub";
import product from "./product";
import cart from "./cart";
import drawer from "./drawer";
import coupon from "./coupon";
import stripe from "./stripe";
import order from "./order";

export default combineReducers({
  user,
  category,
  sub,
  product,
  cart,
  drawer,
  coupon,
  stripe,
  order,
});
