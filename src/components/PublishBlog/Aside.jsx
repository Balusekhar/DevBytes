import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { storage } from "@/Appwrite/config";

function Aside({ sendTags, sendImage, blogDetails }) {
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (blogDetails) {
      setTags(blogDetails.tags);

      // Check if there's an existing image in blogDetails and set the preview
      if (blogDetails.imageUrl) {
        const existingImageUrl = getImageUrl(blogDetails.imageUrl); // Function to get image URL from storage
        setImagePreview(existingImageUrl);
      }
    }
  }, [blogDetails]);

  function getImageUrl(imageId) {
    return storage.getFilePreview(
      import.meta.env.VITE_APPWRITE_BUCKETID, // bucketId
      imageId
    ).href;
  }

  function formatTag(tag) {
    return tag.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase
  }

  function addTags(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const formattedTag = formatTag(event.target.value.trim());
      if (tags.length >= 3) {
        toast.error("You can add up to 3 tags only.");
      } else if (tags.includes(formattedTag)) {
        toast.error("Tag already exists.");
      } else {
        setTags([...tags, formattedTag]);
        sendTags([...tags, formattedTag]);
      }
      event.target.value = "";
    }
  }

  function removeTag(indexToRemove) {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    sendTags(updatedTags); // Send the updated tags back to the parent component
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setImage(file);
      sendImage(file);

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
    sendImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="mt-5">
      <div className="mb-8">
        <div className="flex flex-wrap items-center border border-gray-300 rounded-md p-2">
          {tags.map((tag, index) => (
            <Badge key={index} className="mr-3 mb-2 flex items-center">
              {tag}
              <span
                className="ml-1 cursor-pointer text-white"
                onClick={() => removeTag(index)}
              >
                <X className="h-4" />
              </span>
            </Badge>
          ))}
          <input
            id="tags"
            type="text"
            placeholder="Add tags"
            className="flex-1 border-none focus:ring-0 focus:outline-none"
            onKeyUp={addTags}
          />
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <div className="flex items-center">
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="flex-grow"
            ref={fileInputRef}
          />
          {image && (
            <span
              className="ml-2 cursor-pointer text-rose-800"
              onClick={removeImage}
            >
              <X className="h-6 w-6" />
            </span>
          )}
        </div>
        {/* Display the image preview or existing image */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Aside;
