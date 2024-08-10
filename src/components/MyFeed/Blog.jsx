import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { storage, account } from "@/Appwrite/config";
import { format } from "date-fns";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

function Blog({ blog }) {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    async function listImage() {
      try {
        const result = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_BUCKETID,
          blog.imageUrl
        );
        const imageUrl = result.href;
        setImage(imageUrl);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }

    async function checkAuth() {
      try {
        const user = await account.get();
        return user;
      } catch (error) {
        return false;
      }
    }

    listImage();

    checkAuth().then((user) => {
      if (user) {
        setUserName(user.name);
      }
    });

    const formattedDate = format(new Date(blog.$createdAt), "MMMM dd, yyyy");
    setCreatedAt(formattedDate);
  }, [blog.$createdAt]);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/${blog.$id}/${blog.slug}`);
  };

  return (
    <div
      className="flex m-4 w-full flex-col cursor-pointer items-center rounded-md border md:flex-row bg-white shadow-lg"
      onClick={handleNavigation}
    >
      <div className="h-[200px] w-full md:w-[300px] flex-shrink-0">
        <img
          src={image}
          alt="Blog Image"
          className="h-full w-full rounded-l-md object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {blog.title} <ArrowUpRight className="ml-2 h-4 w-4" />
        </h1>
        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          {parse(blog.content)}
        </div>
        <div className="mt-4">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <span className="flex flex-col">
            <span className="text-[14px] font-medium text-gray-900">
              Written by: <span className="font-semibold">{userName}</span>
            </span>
            <span className="text-[12px] text-gray-500">
              Created on: {createdAt}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blog;
