import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/accounts/check-session/", {
          method: "GET",
          credentials: "include", // ✅ important
          headers: { "Cache-Control": "no-cache" },
        });
        const data = await res.json();
        console.log("Check session:", res.status, data);
        setLoggedIn(res.ok);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!loggedIn) return <Navigate to="/login" />;
  return children;
}
