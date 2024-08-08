import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import RichTextEditor from "./RichTextEditor";
import Aside from "./Aside";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [tags, setTags] = useState([]);

  function publishBlog() {
    console.log("Title:", title);
    console.log("Blog Content:", blog);
    console.log("Tags:", tags);
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-between pt-8 pb-6 px-16">
        <h1 className="text-4xl font-roboto font-medium">Write your Blog Here:</h1>
        <Button onClick={publishBlog}>Publish</Button>
      </div>
      <div className="px-16 flex-1 flex overflow-hidden">
        <div className="w-[70%] mr-8 flex flex-col">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-14 p-4 text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Add a Title"
          />
          <div className="flex-1 overflow-y-auto mb-4"> {/* Added mb-4 to give some margin at the bottom */}
            <RichTextEditor setBlogContent={setBlog} />
          </div>
        </div>
        <div className="w-[30%]">
            <Aside 
            sendTags={setTags}
            />
        </div>
      </div>
    </div>
  );
}

export default NewBlog;