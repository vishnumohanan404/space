import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ON_PROGRESS,
  LIKE_POST_REQUEST,
  // LIKE_POST_SUCCESS,
  // LIKE_POST_FAILURE
} from "./PostTypes";

const initialState = {
  isLoading: false,
  addPostLoading: false,
  posts: [],
  error: null,
  progress: false,
  isLiked: null
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        posts: action.payload,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        posts: [action.payload, ...state.posts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        error: action.payload,
      };
    case ON_PROGRESS:
      return {
        ...state,
        progress: action.payload
      }
    case LIKE_POST_REQUEST:
      return {
        ...state,
        isLiked:action.payload
      }
    default:
      return state;
  }
};



export default PostReducer;
