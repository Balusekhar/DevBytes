import React, { useState } from "react";
import { PenLine, LoaderCircle, User } from "lucide-react";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { account } from "@/Appwrite/config";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function logout() {
    try {
      setLoading(true);
      await account.deleteSession("current");
      toast("Logout Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="relative mb-8 pt-6 w-full bg-white">
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
          <Link to="/new">
            <Button
              size="default"
              className="inline-flex px-6 items-center justify-center text-white"
            >
              <PenLine className="mr-2" />
              Write
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative inline-flex items-center justify-center rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleProfile}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                {loading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Logout"
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Header;
