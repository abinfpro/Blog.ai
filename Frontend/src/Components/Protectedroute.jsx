import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

export default function Protectedroute({ login }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/check-auth", {
          withCredentials: true,
        });        
        if (res.data.user) {
          setAuth(true);

        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      }
    };

    checkAuth();
  }, [login]);

  if (auth === null) {
    return <p>Checking authentication...</p>;
  }

  if (login) {
    return auth ? <Navigate to="/" replace /> : <Outlet />;
  }
  return auth ? <Outlet /> : <Navigate to="/auth" replace />;
}
