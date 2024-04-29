import { config, databases, bucket } from "@/appwrite/config";
import { Query, ID } from "appwrite";

// CREATE-POST
async function createPost({ contentURL, content, tags, author, isDraft }) {
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
}

// GET-ALL-POSTS
async function getPosts(queries = [Query.equal("isDraft", "false")]) {
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
}

// GET-SINGLE-POST
async function getPost(documentId) {
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
}

// UPDATE-POST
async function updatePost(documentId, { contentURL, content, tags, isDraft }) {
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
}

// DELETE-POST
async function deletePost(documentId) {
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
}

// UPLOAD-FILE
async function uploadFile(file) {
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
}

// UPDATE-FILE
async function updateFile(fileId, newFile) {
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
}

// DELETE-FILE
async function deleteFile(fileId) {
  try {
    return await bucket.deleteFile(config.appwritePostBucketId, fileId);
  } catch (error) {
    console.log("Appwrite service :: deleteFile() :: ", error);
    return false;
  }
}

// GET-IMAGE-FILE-PREVIEW
function getFilePreview(fileId) {
  return bucket.getFilePreview(config.appwritePostBucketId, fileId).href;
}

// Export the functions
export {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  uploadFile,
  updateFile,
  deleteFile,
  getFilePreview,
};
