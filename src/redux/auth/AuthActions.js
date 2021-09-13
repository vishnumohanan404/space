import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./AuthTypes";
import { api } from "../../api.config";

// login actions
export const loginStart = (userCredentials) => ({
  type: LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logOut = () => ({
  type: LOGOUT,
});

export const loginCall = (userCredentials) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      await api.post(`/login`, userCredentials);
      const userData = await api.get(`/`);
      dispatch(loginSuccess(userData));
    } catch (err) {
      console.log("Error:", err);
      dispatch(loginFailure(err));
    }
  };
};

export const logOutCall = () => {
  return (dispatch) => {
    dispatch(logOut());
  };
};

