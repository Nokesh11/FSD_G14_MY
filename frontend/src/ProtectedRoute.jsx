import { useLogin } from "./LoginContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, loading, error, userRole } = useLogin();

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error || !isAuthenticated) {
    return <Navigate to={"/"}/>
  }

  // Check if the required role matches
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to={"/unauthorized"}/>
  }

  return element; // Render the protected component if authenticated and role matches
};

export default ProtectedRoute;
