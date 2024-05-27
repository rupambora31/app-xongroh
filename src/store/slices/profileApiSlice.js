import { config, databases } from "@/appwrite/config";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Query } from "appwrite";

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // GET-PROFILE ENDPOINT
    getProfile: builder.query({
      queryFn: async (userId) => {
        try {
          const queries = [Query.equal("userId", userId)];
          const result = await databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteProfileCollectionId,
            queries
          );
          return { data: result };
        } catch (error) {
          console.log("Apprite service :: getProfile :: ", error);
          throw error;
        }
      },
    }),
  }),
});

export const { useGetProfileQuery } = profileApiSlice;
