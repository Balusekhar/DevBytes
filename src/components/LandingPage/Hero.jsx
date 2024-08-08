import React from "react";
import { Button } from "../ui/button";
import { StickyNote } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-center p-6 bg-white">
      <h1 className="noto-serif text-6xl lg:text-7xl mb-6">
        Effortless Publishing
      </h1>
      <p className="roboto-thin text-xl lg:text-2xl mb-6 text-[#52525b] max-w-2xl mx-auto">
        AI-assisted blogging for developers and teams. Draft to published in
        minutes.
      </p>
      <Link to="/login">
        <Button size="lg" className="flex justify-center items-center">
          <StickyNote className="mr-2" />
          Start a Blog
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
