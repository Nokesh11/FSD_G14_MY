import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userID = localStorage.getItem("userID");
      const type = localStorage.getItem("type");
      const instID = localStorage.getItem("instID");

      if (!token) {
        // If there's no token, we assume the user is not authenticated
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/verify-token`,
          {
            token,
            userID,
            type,
            instID,
          }
        );

        if (response.status === 200) {
          // Set authentication and user role
          setIsAuthenticated(true);
          setUserRole(type);
        } else {
          setIsAuthenticated(false);
          setError("User not authenticated");
        }
      } catch (error) {
        setIsAuthenticated(false);
        setError("User not authenticated");
      } finally {
        setLoading(false); // End the loading phase
      }
    };

    checkAuth();
  }, [isAuthenticated]); 

  return (
    <LoginContext.Provider
      value={{ isAuthenticated, loading, error, userRole }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
