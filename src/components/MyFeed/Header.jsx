import React from "react";
import { PenLine, LogOut } from "lucide-react";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button"; // Adjust the path according to your project structure

function Header() {
  return (
    <div className="relative pt-6 w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img className="h-12" src={logo} alt="DevBytes" />
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search"
          />
          <Button size="default" className="inline-flex px-6 items-center justify-center text-white">
            <PenLine className="mr-2" />
            Write
          </Button>
          <Button size="default" className="inline-flex px-6 items-center justify-center bg-black hover:bg-slate-800 text-white">
            {/* <LogOut className="mr-2" /> */}
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
