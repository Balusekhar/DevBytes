import React, { useEffect, useState } from "react";
import Header from "./Header";
import Blog from "./Blog";
import { databases } from "@/Appwrite/config";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";

function Feed() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function listAllBlogs() {
      try {
        setLoading(true);
        const result = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_COLLECTIONID
        );
        const allBlogs = result.documents;
        setUserBlogs(allBlogs);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch blogs");
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    listAllBlogs();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-start">
            {Array.from({ length: userBlogs.length || 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-start">
          {userBlogs.map((blog) => {
            return <Blog key={blog.$id} blog={blog} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;
