import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./UserSignUp/UserSignUpSlice.js"
export const store = configureStore({
  reducer: signUpReducer,
});
