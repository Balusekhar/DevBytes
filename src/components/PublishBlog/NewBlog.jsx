import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import RichTextEditor from "./RichTextEditor";
import Aside from "./Aside";
import { ID } from "appwrite";
import { toast } from "sonner";
import { account, databases, storage } from "@/Appwrite/config";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [userId, setUserId] = useState(null);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function getUserId() {
    try {
      const user = await account.get();
      const userId = user.$id;
      console.log("User ID:", userId);
      setUserId(userId); // Set the userId state here
    } catch (error) {
      console.error("Failed to get user ID", error);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);

  async function publishBlog() {
    setLoading(true);
    let documentId = null;
    try {
      const slug = generateSlug(title);

      const blogDetails = {
        title,
        content: blog,
        author: String(userId),
        imageUrl: null,
        tags,
        slug,
      };

      // First, save the blog post to the database without the image
      const savedBlog = await saveBlogPost(blogDetails);
      documentId = savedBlog.$id; // Store the document ID

      console.log("Blog Details:", blogDetails);

      // If there is an image, proceed to upload it
      if (image) {
        const result = await uploadFile(image);
        const imageId = result.$id;

        // Update the blog post with the image URL after successful upload
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_COLLECTIONID,
          documentId,
          { imageUrl: imageId }
        );
      }

      toast.success("Blog published successfully");
      navigate("/feed");
    } catch (error) {
      if (documentId) {
        await databases.deleteDocument(
          import.meta.env.VITE_APPWRITE_DATABASEID,
          import.meta.env.VITE_APPWRITE_COLLECTIONID,
          documentId
        );
      }
      toast.error("Failed to publish blog");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  async function uploadFile(image) {
    const result = await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKETID, // bucketId
      ID.unique(), // fileId
      image // file
    );
    return result;
  }

  async function saveBlogPost(blogDetails) {
    return await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASEID,
      import.meta.env.VITE_APPWRITE_COLLECTIONID,
      ID.unique(),
      blogDetails
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-between pt-8 pb-6 px-16">
        <h1 className="text-4xl font-roboto font-medium">
          Write your Blog Here:
        </h1>
        <Button onClick={publishBlog}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Publish"}
        </Button>
      </div>
      <div className="px-16 flex-1 flex overflow-hidden">
        <div className="w-[70%] mr-8 flex flex-col">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-14 p-4 mt-2 text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Add a Title"
          />
          <div className="flex-1 overflow-y-auto mb-4">
            <RichTextEditor setBlogContent={setBlog} />
          </div>
        </div>
        <div className="w-[30%]">
          <Aside sendTags={setTags} sendImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default NewBlog;
