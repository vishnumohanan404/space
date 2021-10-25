const ADD_POST_REQUEST = "ADD_POST_REQUEST";
const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
const ADD_POST_FAILURE = "ADD_POST_FAILURE";
const ON_PROGRESS = "ON_PROGRESS";

const initialState = {
  addPostLoading: false,
  progress: null
};

export const WritePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
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
        progress: action.payload,
      };
    default:
      return state;
  }
};

