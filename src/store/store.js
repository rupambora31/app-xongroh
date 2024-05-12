import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authApiSlice";
import userReducer from "./slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

setupListeners(store.dispatch);
