import React, { useState, useEffect } from "react";
import "../styles/LoginForm.css";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../LoginContext";

const validateUsername = (username, isAdmin = false) => {
  if (!username) return "Username is required";
  // const rolePrefix = isAdmin ? 'F' : 'S'; // 'F' for admin, 'S' for student
  // if (!new RegExp(`^${rolePrefix}[a-zA-Z0-9]+$`).test(username)) {
  //   return `Invalid username. Must start with '${rolePrefix}' for ${isAdmin ? 'admin' : 'student'}.`;
  // }
  return "";
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "";
};

export default function LoginForm() {
  const { isAuthenticated } = useLogin();
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({
    instituteId: "",
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    instituteId: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({ login: {}, signup: {} });
  const [error, setError] = useState("");
  const [usernameClass, setUsernameClass] = useState("input-box");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      console.log("Verifying token...");
      const token = localStorage.getItem("token");
      const userID = localStorage.getItem("userID");
      const instID = localStorage.getItem("instID");
      const type = localStorage.getItem("type");

      if (!token || !userID || !instID || !type) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/verify-token`,
          { token, userID, instID, type }
        );

        if (response.status === 200) {
            if (type === "admin") {
              setLoading(false);
              console.log("hi");
              navigate("/faculty/dashboard");
            } else {
              console.log("hi");
              setLoading(false);
              navigate("/student/dashboard");
            }
          
        } else {
          localStorage.clear();
          navigate("/");
        }
      } catch (error) {
        console.error("Token verification failed", error);
        localStorage.clear();
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    const data = role === "admin" ? signupData : loginData;

    const instituteIdError = !data.instituteId
      ? "Institute Id is required"
      : "";
    const usernameError = validateUsername(data.username, role === "admin");
    const passwordError = validatePassword(data.password);

    if (instituteIdError || usernameError || passwordError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [role]: {
          instituteId: instituteIdError,
          username: usernameError,
          password: passwordError,
        },
      }));
    } else {
      try {
        const formattedData = {
          userID: data.username,
          password: data.password,
          type: role,
          instID: data.instituteId,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/verify-creds`,
          formattedData
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", role);
          const userRole = role === "admin" ? "faculty" : "student";
          localStorage.setItem("instID", data.instituteId);
          localStorage.setItem("userID", data.username);

          setLoading(false);
          navigate(
            userRole === "faculty" ? "/faculty/dashboard" : "/student/dashboard"
          );
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Login failed", error);
        setError("Login failed, please try again.");
      }
    }
  };

  // Dynamic username field styling
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setLoginData({ ...loginData, username });
    const isValid = validateUsername(username) === "";
    setUsernameClass(isValid ? "input-box valid" : "input-box invalid");
  };

  // Dynamic password field handling and error clearing
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setLoginData({ ...loginData, password });
    const passwordError = validatePassword(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      login: {
        ...prevErrors.login,
        password: passwordError ? passwordError : "",
      }, // Clear error if valid
    }));
  };

  // Handle Institute Id change for login
  const handleInstituteIdChangeLogin = (e) => {
    const instituteId = e.target.value;
    setLoginData({ ...loginData, instituteId });
    const instituteIdError = !instituteId ? "Institute Id is required" : "";
    setErrors((prevErrors) => ({
      ...prevErrors,
      login: {
        ...prevErrors.login,
        instituteId: instituteIdError ? instituteIdError : "",
      }, // Clear error if valid
    }));
  };

  // Handle Institute Id change for signup
  const handleInstituteIdChangeSignup = (e) => {
    const instituteId = e.target.value;
    setSignupData({ ...signupData, instituteId });
    const instituteIdError = !instituteId ? "Institute Id is required" : "";
    setErrors((prevErrors) => ({
      ...prevErrors,
      signup: {
        ...prevErrors.signup,
        instituteId: instituteIdError ? instituteIdError : "",
      }, // Clear error if valid
    }));
  };

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>
      {error ?? <p className="text-red text-sm">{error}</p>}

      {/* Login Form */}
      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
          Login
        </h2>
        <form onSubmit={(e) => handleSubmit(e, "student")}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              value={loginData.instituteId}
              onChange={handleInstituteIdChangeLogin}
              required
            />
            <label>Institute Id</label>
            {errors.login.instituteId && (
              <p className="error-message">{errors.login.instituteId}</p>
            )}
          </div>
          <div
            className={`${usernameClass} animation`}
            style={{ "--i": 1, "--j": 22 }}
          >
            <input
              type="text"
              value={loginData.username}
              onChange={handleUsernameChange}
              required
            />
            <label>Student ID</label>
            {errors.login.username && (
              <p className="error-message">{errors.login.username}</p>
            )}
          </div>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
            <input
              type="password"
              value={loginData.password}
              onChange={handlePasswordChange}
              required
            />
            <label>Password</label>
            {errors.login.password && (
              <p className="error-message">{errors.login.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 3, "--j": 24 }}
          >
            Login
          </button>
          <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 }}>
            <p>
              Are you an admin?{" "}
              <span
                className="register-link cursor-pointer text-blue-700 font-semibold"
                onClick={handleRegisterClick}
              >
                Admin Login
              </span>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
          Welcome Student!
        </h2>
        <p className="animation" style={{ "--i": 1, "--j": 21 }}>
          Please login with your credentials.
        </p>
      </div>

      {/* Sign-up Form */}
      <div className="form-box register">
        <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
          Login
        </h2>
        <form onSubmit={(e) => handleSubmit(e, "admin")}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              value={signupData.instituteId}
              onChange={handleInstituteIdChangeSignup}
              required
            />
            <label>Institute Id</label>
            {errors.signup.instituteId && (
              <p className="error-message">{errors.signup.instituteId}</p>
            )}
          </div>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              required
            />
            <label>Admin ID</label>
            {errors.signup.username && (
              <p className="error-message">{errors.signup.username}</p>
            )}
          </div>

          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
            <label>Password</label>
            {errors.signup.password && (
              <p className="error-message">{errors.signup.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 21, "--j": 4 }}
          >
            Login
          </button>

          <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 }}>
            <p>
              Are you a student?{" "}
              <span
                className="login-link cursor-pointer text-blue-700 font-semibold"
                onClick={handleLoginClick}
              >
                Student Login
              </span>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
          Welcome Admin!
        </h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 }}>
          Please login with your credentials.
        </p>
      </div>
    </div>
  );
}
