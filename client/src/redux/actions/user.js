import axios from "axios";

import { auth, googleAuthProvider } from "../../services/firebase";
import { USER_LOADED, USER_LOGGED_OUT, UPDATE_ADDRESS, ADDED_TO_WISHLIST } from "./index";
import setTokenHeader from "../../utils/setTokenHeader";

/**
 * Load user into redux state, store access token into localStorage
 */
export const loadUser = (user) => async (dispatch) => {
  try {
    // Get access token from firebase
    const { token } = await user.getIdTokenResult();

    // Store token into local storage
    localStorage.setItem("ACCESS_TOKEN", token);
    setTokenHeader(token);

    // Load user from database
    const res = await axios.get(`${process.env.REACT_APP_API}/users`);

    // Update state
    dispatch({ type: USER_LOADED, payload: res.data.user });
  } catch (error) {
    dispatch(logout());
    console.error("❌ LOAD_USER_ERROR", error);
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
    localStorage.setItem("SIGN_UP_EMAIL", email);
  } catch (error) {
    dispatch(logout());
    console.error(`[❌ register]`, error);
    throw error;
  }
};

/**
 * Complete user registration, then loads user to state
 */
export const completeRegister = ({ email, emailLink, password }) => async (dispatch) => {
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
    } else {
      throw new Error("Something went wrong, try again later.");
    }
  } catch (error) {
    dispatch(logout());
    console.error(`[❌ completeRegister]`, error);
    throw error;
  }
};

/**
 * Logs user in, then loads user to state
 */
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await dispatch(loadUser(user));
  } catch (error) {
    dispatch(logout());
    console.error(`[❌ login]`, error);
    throw error;
  }
};

/**
 * Logs user in with google provider, then loads user to state
 */
export const loginWithGoogle = () => async (dispatch) => {
  try {
    const { user } = await auth.signInWithPopup(googleAuthProvider);
    await dispatch(loadUser(user));
  } catch (error) {
    dispatch(logout());
    console.error(`[❌ loginWithGoogle]`, error);
    throw error;
  }
};

/**
 * Log user log out the application
 */
export const logout = () => async (dispatch) => {
  try {
    // Clears token from localStorage
    localStorage.removeItem("ACCESS_TOKEN");

    // Clear token from axios headers
    setTokenHeader(null);

    // Clear user from state
    dispatch({ type: USER_LOGGED_OUT });

    // Sign out from firebase
    await auth.signOut();
  } catch (error) {
    console.error(`[❌ logout]`, error);
    console.error(error);
  }
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
    dispatch(logout());
    console.error(`[❌ forgotPassword]`, error);
    throw error;
  }
};

/**
 * Update user's password
 */
export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    await auth.currentUser.updatePassword(newPassword);
  } catch (error) {
    dispatch(logout());
    console.error(`[❌ updatePassword]`, error);
    throw error;
  }
};

/**
 * Request success if user is admin
 */
export const checkIsAdmin = async () => {
  try {
    setTokenHeader(localStorage.getItem("ACCESS_TOKEN"));
    await axios.get(`${process.env.REACT_APP_API}/users/is-admin`);
  } catch (error) {
    console.error(`[❌ checkIsAdmin]`, error);
    throw error;
  }
};

/**
 * Update user's address
 */
export const updateUserAddress = (address) => async (dispatch) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API}/users`, {
      address,
    });
    dispatch({
      type: UPDATE_ADDRESS,
      payload: res.data.user,
    });
  } catch (error) {
    console.error(`[❌ updateUserAddress]`, error);
    throw error;
  }
};

/**
 * Add product to user's wishlist
 */
export const addToWishlist = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/users/wishlist`, {
      id,
    });
    dispatch({
      type: ADDED_TO_WISHLIST,
      payload: res.data.user,
    });
  } catch (error) {
    console.error(`[❌ addToWishlist]`, error);
    throw error;
  }
};
