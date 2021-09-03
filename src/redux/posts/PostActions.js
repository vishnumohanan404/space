import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  UPLOAD_MEDIA_REQUEST,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "./PostTypes";
import { api } from "../../api.config";
import axios from "axios";

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchPostsFailure = (errors) => {
  return {
    type: FETCH_POSTS_ERROR,
    payload: errors,
  };
};

export const addPostRequest = () => {
  return {
    type: ADD_POST_REQUEST,
  };
};

export const addPostSuccess = (result) => {
  return {
    type: ADD_POST_SUCCESS,
    payload: result,
  };
};

export const addPostFailure = (errors) => {
  return {
    type: ADD_POST_FAILURE,
    payload: errors,
  };
};

export const uploadMediaRequest = () => {
  return {
    type: UPLOAD_MEDIA_REQUEST,
  };
};

export const uploadMediaSuccess = (res) => {
  return {
    type: UPLOAD_MEDIA_SUCCESS,
    payload: res,
  };
};

export const uploadMediaFailure = (error) => {
  return {
    type: UPLOAD_MEDIA_FAILURE,
    payload: error,
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    api
      .get("/feeds/")
      .then((res) => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(fetchPostsFailure(err.message));
      });
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    dispatch(addPostRequest());
    axios
      .post("http://localhost:5000/api/post", data, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
          console.log("Progress: ",progressEvent)
        },
      })
      .then((result) => {
        console.log(result, "result in axios");
        // dispatch(addPostSuccess(result.data));
      })
      .catch((err) => {
        console.log("Error:",err.message);
        dispatch(addPostFailure(err.message));
      });
  };
};

export const uploadMedia = () => {
  return (dispatch) => {
    dispatch(uploadMediaRequest());
    api
      .get("/upload")
      .then((res) => {
        dispatch(uploadMediaSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(uploadMediaFailure(err.message));
      });
  };
};
