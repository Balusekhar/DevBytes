import React from "react";
import Header from "./Header";
import Blog from "./Blog";

function Feed() {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-start">
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
        </div>
      </div>
    </div>
  );
}

export default Feed;
