import React, { useEffect, useState } from "react";
// import Header from "./Header";
import Hero from "./Hero";

function LandingPage() {
  return (
    <div className="max-h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_center,#C9EBFF,transparent)]">
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
