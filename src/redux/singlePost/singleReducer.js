import { GET_SINGLE_POST,IS_LOADING } from "./singleTypes";

const initialState = {
  isLoading: false,
  posts: [],
};

const NotificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SINGLE_POST:
      return {
        ...state,
        posts: [action.payload],
        isLoading:false
      };
    default:
      return state;
  }
};

export default NotificationReducers;
