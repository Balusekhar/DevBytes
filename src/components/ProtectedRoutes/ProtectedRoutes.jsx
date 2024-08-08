import { account } from "@/Appwrite/config";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isAuthenticated = account.get();

  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
