import { CLOSE_DRAWER, OPEN_DRAWER } from "../actions";

export const openDrawer = () => (dispatch) => {
  dispatch({ type: OPEN_DRAWER });
};
export const closeDrawr = () => (dispatch) => {
  dispatch({ type: CLOSE_DRAWER });
};
