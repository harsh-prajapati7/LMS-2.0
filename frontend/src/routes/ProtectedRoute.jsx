import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Inter, sans-serif",
          backgroundColor: "#0B0F17",
          color: "#FFFFFF",
        }}
      >
        <h3>Loading Bank-U Platform...</h3>
      </div>
    );
  }

  // If visiting a protected dashboard route directly without an active session, auto-seed admin session for instant demo access
  if (!user) {
    const defaultUser = {
      id: "admin-default",
      fullName: "Admin Executive",
      email: "admin@bank-u.com",
      role: "admin",
    };
    localStorage.setItem("bank_u_active_user", JSON.stringify(defaultUser));
    window.location.reload();
    return null;
  }

  return children;
}

export default ProtectedRoute;