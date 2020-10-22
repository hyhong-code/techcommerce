import { combineReducers } from "redux";

import user from "./user";
import category from "./category";
import sub from "./sub";

export default combineReducers({ user, category, sub });
