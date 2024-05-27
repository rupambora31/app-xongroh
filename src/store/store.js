import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authApiSlice";
import userReducer from "./slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApiSlice } from "./slices/postApiSlice";
import { profileApiSlice } from "./slices/profileApiSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      postApiSlice.middleware,
      profileApiSlice.middleware,
    ),
});

setupListeners(store.dispatch);
