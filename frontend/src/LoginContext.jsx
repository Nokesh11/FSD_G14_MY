// LoginContext.js

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
const LoginContext = createContext(null);

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/verify-token`
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setError("User not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <LoginContext.Provider value={{ isAuthenticated, loading, error }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the Login context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
