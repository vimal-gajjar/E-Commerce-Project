import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { users: [] },
  reducers: {
    Store_users(state, action) {
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { Store_users } = userSlice.actions;
export const selectUsers = (state) => state.user.users;
