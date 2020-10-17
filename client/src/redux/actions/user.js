import { auth, googleAuthProvider } from "../../services/firebase";

import { USER_LOADED, USER_LOGGED_OUT } from "./index";

/**
 * Load user into redux state, store access token into localStorage
 */
export const loadUser = (user, callback) => async (dispatch) => {
  try {
    // Get access token from firebase
    const { token } = await user.getIdTokenResult();

    // Store token into local storage
    localStorage.setItem("ACCESS_TOKEN", token);

    // Update state
    dispatch({ type: USER_LOADED, payload: { email: user.email, token } });

    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Registe user via email and send them a verification link
 */
export const register = async (email) => {
  const registerConfig = {
    handleCodeInApp: true,
    url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  };

  try {
    await auth.sendSignInLinkToEmail(email, registerConfig);
    localStorage.setItem("SIGN_UP_EMAIL", email);
  } catch (error) {
    throw error;
  }
};

/**
 * Complete user registration, then loads user to state
 */
export const completeRegister = (
  { email, emailLink, password },
  callback
) => async (dispatch) => {
  try {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const result = await auth.signInWithEmailLink(email, emailLink);

    if (result.user.emailVerified) {
      localStorage.removeItem("SIGN_UP_EMAIL");

      // Set a password for user
      const user = auth.currentUser;
      await user.updatePassword(password);

      // Get a token to use for backend
      await dispatch(loadUser(user));

      // Use callback to redirect user
      if (callback) callback();
    } else {
      throw new Error("Something went wrong, try again later.");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Logs user in, then loads user to state
 */
export const login = ({ email, password }, callback) => async (dispatch) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await dispatch(loadUser(user, callback));
  } catch (error) {
    throw error;
  }
};

/**
 * Logs user in with google provider, then loads user to state
 */
export const loginWithGoogle = (callback) => async (dispatch) => {
  try {
    const { user } = await auth.signInWithPopup(googleAuthProvider);
    await dispatch(loadUser(user, callback));
  } catch (error) {
    throw error;
  }
};

/**
 * Log user log out the application
 */
export const logout = (callback) => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch({ type: USER_LOGGED_OUT });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};
