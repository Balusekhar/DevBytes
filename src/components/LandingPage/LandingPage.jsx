import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { checkAuth } from "@/Appwrite/config";
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate()
  
  useEffect(() => {
    const authenticate = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        navigate("/feed");
      } else {
        navigate("/login");
      }
    };

    authenticate();
  }, [navigate]);

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default LandingPage;
