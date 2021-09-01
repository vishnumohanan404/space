import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
} from "./PostTypes";
import { api } from "../../api.config";

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (posts) => {
    console.log(posts)
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
