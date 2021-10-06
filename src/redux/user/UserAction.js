import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  // ON_PROGRESS
  ON_PROGRESS,
  // USER_POST
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
  // FRIEND_REQUEST
  FRIEND_REQUEST_START,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILURE,
  // CLEAR_USER
  CLEAR_USER,
  // UPDATE_PROFILE
  UPDATE_PROFILE,
  // TAB
  TAB

  // get request details
  // GET_REQUEST_DETAILS_START,
  // GET_REQUEST_DETAILS_SUCCESS,
  // GET_REQUEST_DETAILS_FAILURE,
} from "./UserType";

// import { updateUser } from "../";
import { api } from "../../api.config";

export const fetchUserPostsRequest = () => {
  return {
    type: FETCH_USER_POSTS_REQUEST,
  };
};

export const fetchUserPostsSuccess = (posts) => {
  return {
    type: FETCH_USER_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchUserPostsFailure = (errors) => {
  return {
    type: FETCH_USER_POSTS_ERROR,
    payload: errors,
  };
};

// GET PROFILE

export const getProfileStart = () => ({
  type: GET_PROFILE_START,
});

export const getProfileSuccess = (profile, user) => ({
  type: GET_PROFILE_SUCCESS,
  payload: { profile, user },
});

export const getProfileFailure = (err) => ({
  type: GET_PROFILE_FAILURE,
  payload: err,
});

// ON_PROGRESS
export const onProgress = (progress) => {
  return {
    type: ON_PROGRESS,
    payload: progress,
  };
};

export const getProfile = (id, user) => {
  return async (dispatch) => {
    dispatch(getProfileStart());
    try {
      const userData = await api.get(`/profile/${id}`, null, {
        onDownloadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
          // progress in %
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("Progress",progress)
          dispatch(onProgress(progress));
        },
      });
      console.log(`userData.data`, userData.data)
      dispatch(getProfileSuccess(userData.data, user));
    } catch (err) {
      console.log("Error: ", err);
      dispatch(getProfileFailure(err));
    }
  };
};

// friendRequest

export const friendRequestStart = () => ({
  type: FRIEND_REQUEST_START,
});

export const friendRequestSuccess = (res) => ({
  type: FRIEND_REQUEST_SUCCESS,
  payload: res,
});

export const friendRequestFailure = (err) => ({
  type: FRIEND_REQUEST_FAILURE,
  payload: err,
});

export const friendRequest = (id, socket) => {
  return async (dispatch) => {
    dispatch(friendRequestStart());
    try {
      const userData = await api.put(`/friend-request/${id}`);
      dispatch(friendRequestSuccess(userData.data));
      // dispatch(updateUser(userData.data))
      console.log(`Friend request response`, userData.data)
      socket.emit("REQUEST_SENT", userData.data);
    } catch (err) {
      console.log("Error: ", err);
      dispatch(friendRequestFailure());
    }
  };
};


// UPDATE_PROFILE
export const updateProfile = (updatedProfile)=>{
  return {
    type: UPDATE_PROFILE,
    payload: {profile:updatedProfile}
  }
}

// CLEAR_USER
export const clearUserProfile = () => {
  return {
    type: CLEAR_USER,
  };
};

// TAB

export const setTab = (tabIndex) => {
  return {
    type: TAB,
    payload: tabIndex
  };
};






// get reqiuest details

// export const getRequestDetailsStart = () => ({
//   type: GET_REQUEST_DETAILS_START,
// });

// export const getRequestDetailsSuccess = (profile, user) => ({
//   type: GET_REQUEST_DETAILS_SUCCESS,
//   payload: { profile, user },
// });

// export const getRequestDetailsFailure = (err) => ({
//   type: GET_REQUEST_DETAILS_FAILURE,
//   payload: err,
// });

// export const getRequestDetails = (id, user) => {
//   return async (dispatch) => {
//     dispatch(getProfileStart());
//     try {
//       const userData = await api.get(`/profile/${id}`);
//       dispatch(getProfileSuccess(userData.data, user));
//     } catch (err) {
//       console.log("Error: ", err);
//       dispatch(getProfileFailure(err));
//     }
//   };
// };
