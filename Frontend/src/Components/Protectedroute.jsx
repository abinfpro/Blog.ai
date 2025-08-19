import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
export default function Protectedroute() {
  const [auth, setauth] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/check-auth", {
          withCredentials: true,
        });
        if (res.data.user) {
          setauth(true);
        }
      } catch (error) {
        setauth(false);
      }
    };
    checkAuth();
  }, []);
  if (auth === null) {
    return <p>Checking authentication...</p>; // Loader while checking
  }
  return auth ? <Outlet /> : <Navigate to="/auth" replace />;
}
