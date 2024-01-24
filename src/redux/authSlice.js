import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    IsLoggedIn: false,
    userEmail: null,
    userName: null,
    userId: null,
    userRole: null,
  },
  reducers: {
    loginuser(state, action) {
      let { userEmail, userName, userId, userRole } = action.payload;
      state.IsLoggedIn = true;
      state.userEmail = userEmail;
      state.userName = userName;
      state.userId = userId;
      state.userRole = userRole;
    },
    logoutuser(state, action) {
      state.IsLoggedIn = false;
      state.userEmail = null;
      state.userName = null;
      state.userId = null;
      state.userRole = null;
    },
  },
});

export default authSlice.reducer;
export const { loginuser, logoutuser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.IsLoggedIn;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserName = (state) => state.auth.userName;
export const selectUserId = (state) => state.auth.userId;
export const selectUserRole = (state) => state.auth.userRole;
