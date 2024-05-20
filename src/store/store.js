import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authApiSlice";
import userReducer from "./slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApiSlice } from "./slices/postApiSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      postApiSlice.middleware
    ),
});

setupListeners(store.dispatch);
