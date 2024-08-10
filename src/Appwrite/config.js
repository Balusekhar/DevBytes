import { Client, Account, Databases, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

export async function checkAuth() {
  try {
    await account.get();
    // console.log(user)
    return true;
  } catch (error) {
    return false;
  }
}
export const account = new Account(client);
// export const users = new Users(account);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from "appwrite";
