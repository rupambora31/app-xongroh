// authApiSlice.js
import { account, config } from "@/appwrite/config";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID } from "appwrite";

export const authApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      queryFn: async ({ email, password, name }) => {
        try {
          const userAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
          );
          console.log("createAccount :: userAccount :: ", userAccount);

          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          console.log("createAccount :: session :: ", session);
          return { response: { userAccount, session } };
        } catch (error) {
          console.error("Apprite service :: createAccount :: ", error);
          throw error;
        }
      },
      invalidatesTags: ["Account"],
    }),

    createSession: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );

          return { data: session };
        } catch (error) {
          console.error("Apprite service :: createSession :: ", error);
          throw error;
        }
      },
      invalidatesTags: ["Account"],
    }),

    deleteSession: builder.mutation({
      queryFn: async () => {
        try {
          await account.deleteSession("current");

          return { data: null };
        } catch (error) {
          console.log("Apprite service :: deleteSession :: ", error);
        }
      },
      invalidatesTags: ["Account"],
    }),

    getAccount: builder.query({
      queryFn: async () => {
        try {
          const user = await account.get();
          return { data: user };
        } catch (error) {
          console.log("Apprite service :: getAccount :: ", error);
        }
      },
      providesTags: ["Account"],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetAccountQuery,
} = authApiSlice;
