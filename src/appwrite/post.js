import conf from "@/conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class PostService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   CREATE-POST
  async createPost({ contentURL, content, tags, author, isDraft }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
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
      console.log("Appwite service :: createPost() :: ", error);
    }
  }

  //   GET-ALL-POSTS
  async getPosts(queries = [Query.equal("isDraft", "false")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }

  //   GET-SINGLE-POST
  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwrite service :: getPost() :: ", error);
      return false;
    }
  }

  //   UPDATE-POST
  async updatePost(documentId, { contentURL, content, tags, isDraft }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
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

  //   DELETE-POST
  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }

  //   *** FILE-SYSTEM ***

  //   UPLOAD-FILE
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritePostBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  //   UPDATE-FILE
  async updateFile(fileId, newFile) {
    try {
      // Upload the new file
      const uploadResponse = await this.bucket.createFile(
        conf.appwritePostBucketId,
        ID.unique(),
        newFile
      );

      if (uploadResponse) {
        const fileUrl = uploadResponse.url;
        const deleteResponse = await this.bucket.deleteFile(
          conf.appwritePostBucketId,
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

  //   DELETE-FILE
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwritePostBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }

  //   GET-IMAGE-FILE-PREVIEW
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwritePostBucketId, fileId).href;
  }
}

const postService = new PostService();
export default postService;
