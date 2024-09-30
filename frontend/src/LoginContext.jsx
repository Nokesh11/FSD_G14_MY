import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Memoize details to prevent unnecessary re-renders
  const details = useMemo(() => ({
    token: localStorage?.getItem("token"),
    userID: localStorage?.getItem("userID"),
    type: localStorage?.getItem("type"),
    instID: localStorage?.getItem("instID"),
  }), []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/verify-token`,
          {
            token: details.token,
            userID: details.userID,
            type: details.type,
            instID: details.instID,
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserRole(details.type);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setError("User not authenticated");
      } finally {
        setLoading(false);
      }
    };

    if (details.token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [details]); 

  return (
    <LoginContext.Provider
      value={{ isAuthenticated, loading, error, userRole }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
