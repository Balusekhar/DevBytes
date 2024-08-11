import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextEditor({ setBlogContent, blogDetails }) {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    // Initialize the blog state with existing content when editing
    if (blogDetails && blogDetails.content) {
      setBlog(blogDetails.content);
    }
  }, [blogDetails]);

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