import React from "react";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-screen flex justify-center fixed top-8 z-10">
      <div className="w-4/5 rounded-3xl shadow flex items-center justify-between h-16 lg:h-20 px-6 lg:px-8">
        <div className="flex-shrink-0">
          <a href="#" title="" className="flex items-center">
            <img className="w-auto h-8 lg:h-12" src={logo} alt="logo" />
          </a>
        </div>

        <Link to="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
