import { checkAuth } from "@/Appwrite/config";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const authenticate = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/");
        toast("You must login first");
      }
    };

    authenticate();
  }, [navigate]);

  return isAuthenticated && <Outlet />;
}

export default ProtectedRoutes;
