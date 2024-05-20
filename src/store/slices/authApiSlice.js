// authApiSlice.js
import { account, config, databases } from "@/appwrite/config";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID } from "appwrite";

export const authApiSlice = createApi({
  reducerPath: 'authApi', 
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    // CREATE-ACCOUNT ENDPOINT
    createAccount: builder.mutation({
      queryFn: async ({ email, password, name, hometown }) => {
        try {
          // CREATE ACCOUNT
          const userAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
          );
          console.log("createAccount :: userAccount :: ", userAccount);

          //  CREATE SESSION
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          console.log("createAccount :: session :: ", session);

          // CREATE PROFILE
          const username = email.split("@")[0];
          const userId = userAccount.$id;
          const userDocument = await databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteProfileCollectionId,
            ID.unique(),
            {
              username,
              hometown,
              userId,
            }
          );

          console.log("createAccount :: userDocument :: ", userDocument);

          return { response: { userAccount, session } };
        } catch (error) {
          console.error("Apprite service :: createAccount :: ", error);
          throw error;
        }
      },
      invalidatesTags: ["Account"],
    }),

    // CREATE-SESION ENDPOINT
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

    // DELETE-SESSION ENDPOINT
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

    //  GET-ACCOUNT ENDPOINT
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
