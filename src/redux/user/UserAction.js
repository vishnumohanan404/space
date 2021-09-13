import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  //   user posts
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
  // friend request
  FRIEND_REQUEST_START,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILURE,
  // get request details
  GET_REQUEST_DETAILS_START,
  GET_REQUEST_DETAILS_SUCCESS,
  GET_REQUEST_DETAILS_FAILURE,
} from "./UserType";

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

// get profile

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

export const getProfile = (id, user) => {
  return async (dispatch) => {
    dispatch(getProfileStart());
    try {
      const userData = await api.get(`/profile/${id}`);
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

export const friendRequest = (id) => {
  return async (dispatch) => {
    dispatch(friendRequestStart());
    try {
      const userData = await api.put(`/friend-request/${id}`);
      dispatch(friendRequestSuccess(userData.data));
    } catch (err) {
      console.log("Error: ", err);
      dispatch(friendRequestFailure());
    }
  };
};

// get reqiuest details

export const getRequestDetailsStart = () => ({
  type: GET_REQUEST_DETAILS_START,
});

export const getRequestDetailsSuccess = (profile, user) => ({
  type: GET_REQUEST_DETAILS_SUCCESS,
  payload: { profile, user },
});

export const getRequestDetailsFailure = (err) => ({
  type: GET_REQUEST_DETAILS_FAILURE,
  payload: err,
});

export const getRequestDetails = (id, user) => {
  return async (dispatch) => {
    dispatch(getProfileStart());
    try {
      const userData = await api.get(`/profile/${id}`);
      dispatch(getProfileSuccess(userData.data, user));
    } catch (err) {
      console.log("Error: ", err);
      dispatch(getProfileFailure(err));
    }
  };
};
