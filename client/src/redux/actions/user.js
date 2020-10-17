import { auth } from "../../services/firebase";
import { USER_LOADED } from "./index";

export const loadUser = (user) => async (dispatch) => {
  try {
    // Get access token from firebase
    const { token } = await user.getIdTokenResult();

    // Store token into local storage
    localStorage.setItem("ACCESS_TOKEN", token);

    // Update state
    dispatch({ type: USER_LOADED, payload: { email: user.email, token } });
  } catch (error) {
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();
  } catch (error) {}
};
