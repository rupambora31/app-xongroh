// authApiSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "@/appwrite/services/authService";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      queryFn: async (user) => {
        try {
          const response = await register(user);
          return { data: response };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    loginUser: builder.mutation({
      queryFn: async (credentials) => {
        try {
          const response = await login(credentials);
          return { data: response };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getCurrentUser: builder.query({
      queryFn: async () => {
        try {
          const response = await getCurrentUser();
          return { data: response };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    logoutUser: builder.mutation({
      queryFn: async () => {
        try {
          await logout();
          return { data: null };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = authApiSlice;
