import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

// Redirects unauthenticated users to /login
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuthContext();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
