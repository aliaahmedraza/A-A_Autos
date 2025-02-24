import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "./Slicers/UserSignUpSlice.js";
import userReducer from "./Slicers/userSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // ✅ Persist only the "user" state
};

const rootReducer = combineReducers({
  signUp: signUpReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevents serialization errors
    }),
});

// ✅ Export persistor properly
export const persistor = persistStore(store);

