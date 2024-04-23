import conf from "../conf/conf";
import { Client, Account, ID, Databases, Query } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }
  // REGISTER-USER
  async register({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // default username
        const username = email.split("@")[0];

        const userDocument = await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteProfileCollectionId,
          ID.unique(),
          {
            email: email,
            name: name,
            username: username,
          }
        );

        if (userDocument) {
          return this.login({ email, password });
        } else {
          console.error("Failed to add user to the collection");
          return null;
        }
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // LOGIN-USER
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // GET-CURRENT-USER
  async getCurrentUser() {
    try {
      return this.account.get;
    } catch (error) {
      console.log("Apprite service :: getCurrentUser :: ", error);
    }
    return null;
  }

  // LOGOUT-USER
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Apprite service :: logout() :: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
