import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authSlice from "./authSlice";
import leaveSlice from "./leaveSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authSlice,
        leave: leaveSlice,
    }
})

export default store;