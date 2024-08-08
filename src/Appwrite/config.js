import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

export async function checkAuth() {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}
export const account = new Account(client);
export { ID } from "appwrite";
