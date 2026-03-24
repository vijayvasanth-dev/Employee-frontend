import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const PublicRoute = ( {children} ) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    api.get("/api/profile")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  return isAuth ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;