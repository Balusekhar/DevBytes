import { databases, storage, account } from "@/Appwrite/config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import parse from "html-react-parser";

function DisplayBlog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [image, setImage] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const result = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_COLLECTIONID,
          id
        );
        setSelectedBlog(result);

        // Fetch author details
        const author = await account.get();
        setAuthorName(author.name);

        // Fetch cover image
        const imageResult = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_BUCKETID,
          result.imageUrl
        );
        setImage(imageResult.href);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    }

    fetchBlog();
  }, [id]);

  if (!selectedBlog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {selectedBlog.title}
      </h1>
      <div className="flex items-center justify-center text-sm text-gray-600 mb-8">
        <p>
          Posted by <span className="font-semibold">{authorName}</span> on{" "}
          {format(new Date(selectedBlog.$createdAt), "MMMM dd, yyyy")}
        </p>
      </div>
      {image && (
        <div className="mb-8">
          <img
            src={image}
            alt={selectedBlog.title}
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}
      <div className="prose max-w-none text-gray-800 leading-relaxed">
        {parse(selectedBlog.content)}
      </div>
    </div>
  );
}

export default DisplayBlog;
