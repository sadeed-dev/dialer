import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
    const userFromLs = JSON.parse(localStorage.getItem("user")); // contains both user and token
  return (userFromLs?.token||user?.token ) ? children : <Navigate to="/login" replace />;
}
