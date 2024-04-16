const conf = {
  appwriteUrl: String(process.env.VITE_APP_APPWRITE_URL),

  appwriteProjectId: String(process.env.VITE_APP_APPWRITE_PROJECT_ID),

  appwriteDatabaseId: String(process.env.VITE_APP_APPWRITE_DATABASE_ID),

  appwritePostCollectionId: String(
    process.env.VITE_APP_APPWRITE_POST_COLLECTION_ID
  ),

  appwriteBucketId: String(process.env.VITE_APP_APPWRITE_BUCKET_ID),
};

export default conf;
