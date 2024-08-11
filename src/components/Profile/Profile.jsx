import React, { useEffect, useState } from "react";
import { databases, account } from "@/Appwrite/config";
import { toast } from "sonner";
import ProfileBlog from "./ProfileBlog";
import { Query } from "appwrite";

function Profile() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getUserIdAndName() {
      try {
        const user = await account.get();
        const userId = user.$id;
        const userName = user.name;
        setUserId(userId); // Set the userId state here
        setUserName(userName); // Set the userName state here

        // Now fetch the blogs using the userId
        fetchUserBlogs(userId);
      } catch (error) {
        console.error("Failed to get user ID", error);
      }
    }

    async function fetchUserBlogs(userId) {
      try {
        const result = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_COLLECTIONID,
          [Query.equal("author", userId)]
        );
        setUserBlogs(result.documents);

        if (result.documents.length === 0) {
          toast.error("No blogs found for this user");
        }
      } catch (error) {
        toast.error("Failed to fetch blogs");
        console.error("Failed to fetch blogs:", error);
      }
    }

    // Fetch user ID and name when component mounts
    getUserIdAndName();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-4">{userName}</h1>
        <button className="mt-2 text-green-600 hover:underline">
          Edit profile
        </button>
      </div>
      <div className="mt-8">
        {userBlogs.map((blog) => (
          <ProfileBlog key={blog.$id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
