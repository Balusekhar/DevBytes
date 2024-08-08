import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextEditor({ setBlogContent }) {
  const [blog, setBlog] = useState("");

  function handleBlogChange(content) {
    setBlog(content);
    setBlogContent(content);
  }

  return (
    <ReactQuill
      className="h-full pb-4" // Added pb-4 to give some padding at the bottom
      theme="snow"
      value={blog}
      onChange={handleBlogChange}
    />
  );
}

export default RichTextEditor;