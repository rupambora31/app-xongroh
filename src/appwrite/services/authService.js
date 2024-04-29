import { account, config, databases } from "../config";
import { ID, Query } from "appwrite";

// REGISTER-USER
async function register({ email, password, name, hometown }) {
  try {
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (userAccount) {
      const username = userAccount.email.split("@")[0];
      const userId = userAccount.$id;
      console.log(userAccount.$id);
      console.log(userAccount);

      const loginResponse = await login({ email, password });
      if (!loginResponse) {
        console.error("Failed to log in the user after account creation");
        return null;
      }

      const userDocument = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteProfileCollectionId,
        ID.unique(),
        {
          username,
          userId,
        }
      );

      if (userDocument) {
        console.log("User profile created successfully!");
        return userDocument;
      } else {
        console.error("Failed to create user profile");
        return null;
      }
    } else {
      return userAccount;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// LOGIN-USER
async function login({ email, password }) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// GET-CURRENT-USER
async function getCurrentUser() {
  try {
    const userAccount = await account.get();
    return userAccount;
  } catch (error) {
    console.log("Apprite service :: getCurrentUser :: ", error);
  }
  return null;
}

// LOGOUT-USER
async function logout() {
  try {
    await account.deleteSessions();
  } catch (error) {
    console.log("Apprite service :: logout() :: ", error);
  }
}

// Export the functions
export { register, login, getCurrentUser, logout };
