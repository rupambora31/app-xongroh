import { config, databases, bucket } from "@/appwrite/config";
import { Query, ID } from "appwrite";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // CREATE-POST ENDPOINT
    createPost: builder.mutation({
      queryFn: async ({ contentURL, content, tags, author, isDraft }) => {
        try {
          return await databases.createDocument(
            config.appwriteDatabaseId,
            config.appwritePostCollectionId,
            ID.unique(),
            {
              contentURL,
              content,
              tags,
              author,
              isDraft,
            }
          );
        } catch (error) {
          console.log("Appwrite service :: createPost() :: ", error);
        }
      },
    }),

    // UPDATE-POST ENDPOINT
    updatePost: builder.mutation({
      queryFn: async (documentId, { contentURL, content, tags, isDraft }) => {
        try {
          return await databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwritePostCollectionId,
            documentId,
            {
              contentURL,
              content,
              tags,
              isDraft,
            }
          );
        } catch (error) {
          console.log("Appwrite service :: updatePost() :: ", error);
          return false;
        }
      },
    }),

    // DELETE-POST ENDPOINT
    deletePost: builder.mutation({
      queryFn: async (documentId) => {
        try {
          await databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwritePostCollectionId,
            documentId
          );
          return true;
        } catch (error) {
          console.log("Appwrite service :: deletePost() :: ", error);
          return false;
        }
      },
    }),

    // GET-ALL-POSTS ENDPOINT
    getPosts: builder.query({
      queryFn: async (queries = [Query.equal("isDraft", "false")]) => {
        try {
          return await databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwritePostCollectionId,
            queries
          );
        } catch (error) {
          console.log("Appwrite service :: getPosts() :: ", error);
          return false;
        }
      },
    }),

    // GET-SINGLE-POST ENDPOINT
    getPost: builder.query({
      queryFn: async (documentId) => {
        try {
          return await databases.getDocument(
            config.appwriteDatabaseId,
            config.appwritePostCollectionId,
            documentId
          );
        } catch (error) {
          console.log("Appwrite service :: getPost() :: ", error);
          return false;
        }
      },
    }),

    //  ****** FILES *******

    // CREATE-FILE ENDPOINT
    createPostFile: builder.mutation({
      queryFn: async (file) => {
        try {
          return await bucket.createFile(
            config.appwritePostBucketId,
            ID.unique(),
            file
          );
        } catch (error) {
          console.log("Appwrite service :: uploadFile() :: ", error);
          return false;
        }
      },
    }),

    // UPDATE-FILE ENDPOINT
    updatePostFile: builder.mutation({
      queryFn: async (fileId, newFile) => {
        try {
          // Upload the new file
          const uploadResponse = await bucket.createFile(
            config.appwritePostBucketId,
            ID.unique(),
            newFile
          );

          if (uploadResponse) {
            const fileUrl = uploadResponse.url;
            const deleteResponse = await bucket.deleteFile(
              config.appwritePostBucketId,
              fileId
            );

            if (deleteResponse) {
              console.log("File updated and old version deleted successfully.");
              return fileUrl;
            } else {
              console.error("Failed to delete the old file.");
              return null;
            }
          } else {
            console.error("Failed to upload the new file.");
            return null;
          }
        } catch (error) {
          console.error("Appwrite service :: updateFile() :: ", error);
          return null;
        }
      },
    }),

    // DELETE-FILE ENDPOINT
    deletePostFile: builder.mutation({
      queryFn: async (fileId) => {
        try {
          return await bucket.deleteFile(config.appwritePostBucketId, fileId);
        } catch (error) {
          console.log("Appwrite service :: deleteFile() :: ", error);
          return false;
        }
      },
    }),

    // GET-IMAGE-FILE-PREVIEW ENDPOINT
    getPostFilePreview: builder.query({
      queryFn: async (fileId) => {
        return bucket.getFilePreview(config.appwritePostBucketId, fileId).href;
      },
    }),

    // GET-FILE-VIEW ENDPOINT
    getPostFileView: builder.query({
      queryFn: async (fileId) => {
        try {
          return await databases.getFileView(
            config.appwritePostBucketId,
            fileId
          );
        } catch (error) {
          console.log("Appwrite service :: getPost() :: ", error);
          return false;
        }
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostFileMutation,
  useUpdatePostFileMutation,
  useDeletePostFileMutation,
  useGetPostFilePreviewQuery,
  useGetPostFileViewQuery,
} = postApiSlice;
