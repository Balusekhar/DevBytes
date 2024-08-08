import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Aside() {
  const [tags, setTags] = useState([]);

  function addTags(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      if (tags.length >= 3) {
        toast.error("You can add up to 3 tags only.");
      } else {
        setTags([...tags, event.target.value.trim()]);
        // sendTags(tags)
      }
      event.target.value = "";
    }
  }

  function removeTag(indexToRemove) {
    setTags(tags.filter((_, index) => index !== indexToRemove));
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
