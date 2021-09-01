import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from "./PostTypes";

const initialState = {
  isLoading: false,
  posts: [],
  error: null,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
        console.log("Request")
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POSTS_SUCCESS:
      console.log("hello")

      return {
        ...state,
        isLoading: false,
        error: false,
        posts:action.payload
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default PostReducer;