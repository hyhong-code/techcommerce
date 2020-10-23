import { combineReducers } from "redux";

import user from "./user";
import category from "./category";
import sub from "./sub";
import product from "./product";

export default combineReducers({ user, category, sub, product });
