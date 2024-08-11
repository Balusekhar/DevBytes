import { storage } from "@/Appwrite/config";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function ProfileBlog({ blog }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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

    listImage();
  }, []);

  const handleDelete = () => {
    // onDelete(blog.$id);
  };

  const handleEdit = () => {
    navigate(`/${blog.$id}/edit`);
  };

  return (
    <div className="mb-8 p-4 border-b border-gray-300 flex justify-between items-start relative">
      <div className="flex-1">
        <div className="text-sm mb-2">
          <p className="font-semibold">{blog.userName}</p>
          <p className="text-gray-500">
            {new Date(blog.$createdAt).toDateString()}
          </p>
        </div>
        <Link
          to={`/${blog.$id}/${blog.slug}`}
          className="text-xl font-bold hover:underline"
        >
          {blog.title}
        </Link>
        <p className="mt-2 text-gray-700">
          {blog.content.substring(0, 100)}...
        </p>
        <div className="mt-2 flex flex-wrap space-x-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="ml-4 flex-shrink-0 flex items-start">
        <img
          src={image}
          alt="Blog"
          className="h-24 w-24 object-cover rounded-md"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-2 text-gray-500 hover:text-gray-700">
            <MoreVertical className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default ProfileBlog;
