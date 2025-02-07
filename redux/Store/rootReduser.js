import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../redusers/userSlice";
import { postReducer } from "../redusers/postSlice";


const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
});

export default rootReducer;