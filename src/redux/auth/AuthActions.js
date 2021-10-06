import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  // GET_USER
  // GET_USER_START,
  // GET_USER_SUCCESS,
  // GET_USER_FAILURE,
  // UPDATE_USER
  UPDATE_USER,
  // ACCEPT_REQUEST
  ACCEPT_REQUEST_START,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
  // REJECT_REQUEST
  REJECT_REQUEST_START,
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_FAILURE,
  // UNFRIEND
  UNFRIEND_START,
  UNFRIEND_SUCCESS,
  UNFRIEND_FAILURE,
} from "./AuthTypes";
import { api } from "../../api.config";
import { socketClose } from "../socket/SocketActions";
import { SET_ACTIVE } from "../chat/chatTypes";

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
    dispatch(socketClose);
    dispatch(logOut());
  };
};

const setActiveSuccess = (toggle) => {
  return {
    type: SET_ACTIVE,
    payload: toggle,
  };
};

export const setActive = (toggle) => {
  return async (dispatch) => {
    try {
      await api.put(`/online`,{toggle});
      dispatch(setActiveSuccess(toggle));
    } catch (err) {
      console.log("Error:", err);
    }
  };
};

// UPDATE_USER
export const updateUser = (newUser) => {
  console.log(newUser, "newUser");
  return {
    type: UPDATE_USER,
    payload: newUser,
  };
};

// GET_USER

// export const getUserStart = () => {
//   return {
//     type: GET_USER_START,
//   };
// };

// export const getUserSuccess = (user) => {
//   return {
//     type: GET_USER_SUCCESS,
//     payload: user,
//   };
// };

// export const getUserFailure = (err) => {
//   return {
//     type: GET_USER_FAILURE,
//     payload: err,
//   };
// };

// export const getUser = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(getUserStart());
//       const user = await api.get("/");
//       dispatch(getUserSuccess(user.data));
//     } catch (err) {
//       console.log("err", err);
//       dispatch(getUserFailure());
//     }
//   };
// };

// ACCEPT_USER

export const acceptRequestStart = () => {
  return {
    type: ACCEPT_REQUEST_START,
  };
};

export const acceptRequestSuccess = (updatedUser) => {
  return {
    type: ACCEPT_REQUEST_SUCCESS,
    payload: updatedUser,
  };
};

export const acceptRequestFailure = (err) => {
  return {
    type: ACCEPT_REQUEST_FAILURE,
    payload: err,
  };
};

export const acceptRequest = (id, socket) => {
  return async (dispatch) => {
    try {
      dispatch(acceptRequestStart());
      const response = await api.put(`friend-request/accept/${id}`);
      console.log(`response.data`, response.data);
      console.log(`response`, response);
      dispatch(acceptRequestSuccess(response.data));
    } catch (err) {
      console.log(`err`, err);
      dispatch(acceptRequestFailure(err));
    }
  };
};

// reject request
export const rejectRequestStart = () => {
  return {
    type: REJECT_REQUEST_START,
  };
};

export const rejectRequestSuccess = (newUser) => {
  return {
    type: REJECT_REQUEST_SUCCESS,
    payload: newUser,
  };
};

export const rejectRequestFailure = (err) => {
  return {
    type: REJECT_REQUEST_FAILURE,
    payload: err,
  };
};

export const rejectRequest = (id, socket) => {
  return async (dispatch) => {
    try {
      dispatch(rejectRequestStart());
      const response = await api.put(`friend-request/reject/${id}`);
      console.log(`response.data`, response.data);
      dispatch(rejectRequestSuccess(response.data));
      socket.emit("REJECT_REQUEST", response.data._id);
    } catch (err) {
      console.log(`err`, err);
      dispatch(rejectRequestFailure(err));
    }
  };
};

// UNFRIEND
export const unfriendStart = () => {
  return {
    type: UNFRIEND_START,
  };
};

export const unfriendSuccess = (newUser) => {
  return {
    type: UNFRIEND_SUCCESS,
    payload: newUser,
  };
};

export const unfriendFailure = (err) => {
  return {
    type: UNFRIEND_FAILURE,
    payload: err,
  };
};

export const unfriend = (id, socket) => {
  return async (dispatch) => {
    dispatch(unfriendStart());
    try {
      const response = await api.put(`/unfriend/${id}`);
      console.log(`response in unfriend`, response);
      dispatch(unfriendSuccess(response.data));
    } catch (err) {
      console.log(`err`, err);
      dispatch(unfriendFailure);
    }
  };
};
