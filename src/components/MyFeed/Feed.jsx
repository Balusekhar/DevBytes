import React, { useEffect, useState } from "react";
import Header from "./Header";
import Blog from "./Blog";
import { databases } from "@/Appwrite/config";
import { toast } from "sonner";

function Feed() {
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    async function listAllBlogs() {
      try {
        const result = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_COLLECTIONID
        );
        const allBlogs = result.documents;
        setUserBlogs(allBlogs);
      } catch (error) {
        toast.error("Failed to fetch blogs");
        console.error("Failed to fetch blogs:", error);
      }
    }

    listAllBlogs();
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <div
          className="flex flex-col justify-center items-start"
        >
          {userBlogs.map((blog) => {
            return <Blog key={blog.$id} blog={blog} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;
