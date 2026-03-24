// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../api/api'

function PrivateRoute({ children }) {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(()=>{
    api.get("/api/profile")
      .then(()=> setIsAuth(true))
      .catch(()=> setIsAuth(false));
  },[]);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute