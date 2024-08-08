import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

function Aside({ sendTags, sendImage }) {
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

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
    }
  }

  function removeImage() {
    setImage(null);
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
      </div>
    </div>
  );
}

export default Aside;
