import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../redusers/userSlice";


const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;