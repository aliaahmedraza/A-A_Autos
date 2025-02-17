import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpSuccess: "",
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUpState: (state, action) => {
      state.signUpSuccess = action.payload;
    },
    clearSignUpState: (state) => {
      state.signUpSuccess = "";
    },
  },
});

export const { signUpState, clearSignUpState } = signUpSlice.actions;

export default signUpSlice.reducer;
