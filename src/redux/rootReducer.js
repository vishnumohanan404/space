import { combineReducers } from "redux";
import PostReducer from "./posts/PostReducer";

const rootReducer = combineReducers({
    posts: PostReducer
})

export default rootReducer