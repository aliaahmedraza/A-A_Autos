import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userState: (state, action) => {
      state.user = action.payload;
    },
    clearUserState: (state) => {
      state.user = {};
    },
  },
});

export const { userState,clearUserState  } = userSlice.actions;

export default userSlice.reducer;
