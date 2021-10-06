import { api } from "../../api.config";
import {
  GET_SINGLE_POST,
  IS_LOADING,
} from "../../redux/singlePost/singleTypes";

export const getPost = (postId) => {
  return async (dispatch) => {
    dispatch({ type: IS_LOADING });
    try {
      const res = await api.get(`/post/${postId}`);
      // console.log(`res.data`, res.data)
      dispatch({ type: GET_SINGLE_POST, payload: res.data });
    } catch (err) {
      console.log("error", err.message);
    }
  };
};
