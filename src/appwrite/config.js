import { Client, Account, Databases, Storage } from "appwrite";

export const config = {
  // Project
  appwriteUrl: String(import.meta.env.VITE_APP_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),

  // Collections
  appwriteProfileCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_PROFILE_COLLECTION_ID
  ),
  appwritePostCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_POST_COLLECTION_ID
  ),
  appwritePortfolioCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_PORTFOLIO_COLLECTION_ID
  ),
  appwriteCommentCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_COMMENT_COLLECTION_ID
  ),
  appwriteCommentReplyCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_COMMENT_REPLY_COLLECTION_ID
  ),
  appwriteFeedbackCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_FEEDBACK_COLLECTION_ID
  ),
  appwriteFeedbackReplyCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_FEEDBACK_REPLY_COLLECTION_ID
  ),
  appwriteLikeCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_LIKE_COLLECTION_ID
  ),
  appwriteSupportCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_SUPPORT_COLLECTION_ID
  ),

  // Buckets
  appwritePostBucketId: String(
    import.meta.env.VITE_APP_APPWRITE_POST_BUCKET_ID
  ),
  appwriteProfileBucketId: String(
    import.meta.env.VITE_APP_APPWRITE_PROFILE_BUCKET_ID
  ),
  appwritePortfolioBucketId: String(
    import.meta.env.VITE_APP_APPWRITE_PORTFOLIO_BUCKET_ID
  ),
};

const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const account = new Account(client);

export const databases = new Databases(client);

export const bucket = new Storage(client);
