import { useLogin } from "./LoginContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, loading, error, userRole } = useLogin();

  if (loading) {
    return <p>Loading...</p>; // Display loading screen while authentication is checked
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/unauthorized" />; // Redirect if user role doesn't match
  }

  return element; // Render the protected component if authenticated and role matches
};

export default ProtectedRoute;
