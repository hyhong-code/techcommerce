import { auth, googleAuthProvider } from "../../services/firebase";

import { AUTH_ERROR, USER_LOADED, USER_LOGGED_OUT } from "./index";

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
    dispatch(authError());
    console.error(error);
  }
};

/**
 * Registe user via email and send them a verification link
 */
export const register = (email) => async (dispatch) => {
  const registerConfig = {
    handleCodeInApp: true,
    url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  };

  try {
    await auth.sendSignInLinkToEmail(email, registerConfig);
    console.log("lksdjflsjfksjf");
    localStorage.setItem("SIGN_UP_EMAIL", email);
  } catch (error) {
    dispatch(authError());
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
    dispatch(authError());
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
    dispatch(authError());
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
    dispatch(authError());
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

    // Clears token from localStorage
    localStorage.removeItem("ACCESS_TOKEN");
    if (callback) callback();
  } catch (error) {
    dispatch(authError());
    console.error(error);
  }
};

/**
 * Clears the user piece of state
 * Sets isInitializing to false for custom route components
 */
export const authError = () => (dispatch) => {
  // Clears token from localStorage
  localStorage.removeItem("ACCESS_TOKEN");
  dispatch({ type: AUTH_ERROR });
};

/**
 * Sends user an email link to reset password
 */
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const passwordResetConfig = {
      url: process.env.REACT_APP_PASSWORD_RESET_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendPasswordResetEmail(email, passwordResetConfig);
  } catch (error) {
    dispatch(authError());
    throw error;
  }
};
