import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Aside({ sendTags }) {
  const [tags, setTags] = useState([]);

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
        <Input id="picture" type="file" />
      </div>
    </div>
  );
}

export default Aside;