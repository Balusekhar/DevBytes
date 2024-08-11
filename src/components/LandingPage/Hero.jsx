import React from "react";
import logo from "../../assets/logo.png";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex h-full flex-col justify-center items-center text-center p-6">
      <div className="p-9 mb-8">
        <div className="flex justify-center">
          <img className="h-10" src={logo} alt="DevBytes logo" />
        </div>
        <h1 className="text-8xl p-4 font-medium lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-800 to-slate-600">
          Where Developers Learn <br /> and Grow Together
        </h1>
        <p className="text-xl lg:text2xl mb-6 px-10 text-[#52525b] max-w-3xl mx-auto">
          Join a community where coding knowledge meets shared experiences.
          Explore, write, and connect with like-minded developers.
        </p>
        <Link to={"/login"} className="flex justify-center">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Start Writing
            </span>
          </ShimmerButton>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
