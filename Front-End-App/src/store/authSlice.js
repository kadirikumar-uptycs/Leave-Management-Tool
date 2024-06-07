import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    userInfo: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userInfo = {};
        },
        dismissNotification: (state, action) => {
            if (Array.isArray(state?.userInfo?.notifications))
                state.userInfo.notifications = state.userInfo.notifications.filter(notification => notification.id !== action.payload)
            else
                state.userInfo.notifications = [];
        }
    }
})


export default authSlice.reducer;
export const { login, logout, dismissNotification } = authSlice.actions;