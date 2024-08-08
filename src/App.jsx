import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import LandingPage from "./components/LandingPage/LandingPage";
import { Toaster } from "@/components/ui/sonner";
import Feed from "./components/MyFeed/Feed";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
