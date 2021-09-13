import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  ON_PROGRESS,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
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

export const likePostRequest = () => {
  return {
    type: LIKE_POST_REQUEST,
  };
};

export const likePostSuccess = (result) => {
  return {
    type: LIKE_POST_SUCCESS,
    payload: result,
  };
};
export const likePostFailure = (error) => {
  return {
    type: LIKE_POST_FAILURE,
    payload: error,
  };
};

export const onProgress = (progress) => {
  return {
    type: ON_PROGRESS,
    payload: progress,
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

export const fetchUserPosts = () => {
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
          // progress in %
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(onProgress(progress));
        },
      })
      .then((result) => {
        dispatch(addPostSuccess(result.data));
      })
      .catch((err) => {
        console.log("Error:", err.message);
        dispatch(addPostFailure(err.message));
      });
  };
};

export const likePost = (id) => {
  return (dispatch) => {
    dispatch(likePostRequest());
    api
      .put(`/post/${id}/like`)
      .then((response) => {
        dispatch(likePostSuccess(response.data));
      })
      .catch((err) => {
        dispatch(likePostFailure(err.message));
      });
  };
};
