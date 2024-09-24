import React, { useState } from 'react';
import '../styles/LoginForm.css';
import '../App.css';

const validateUsername = (username, isAdmin = false) => {
  if (!username) return "Username is required";
  const rolePrefix = isAdmin ? 'F' : 'S'; // 'F' for admin, 'S' for student
  if (!new RegExp(`^${rolePrefix}[a-zA-Z0-9]+$`).test(username)) {
    return `Invalid username. Must start with '${rolePrefix}' for ${isAdmin ? 'admin' : 'student'}.`;
  }
  return '';
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return '';
};

// const validateEmail = (email) => {
//   if (!email) return "Email is required";

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
//   if (!emailRegex.test(email)) {
//     return "Invalid email format. Must be like 'example@domain.com'";
//   }
//   return '';
// };

export default function LoginForm() {
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({ instituteId: '', username: '', password: '' }); //
  const [signupData, setSignupData] = useState({ instituteId: '', username: '', password: '' });  //
  const [errors, setErrors] = useState({ login: {}, signup: {} });
  const [usernameClass, setUsernameClass] = useState('input-box'); // Dynamic class for username field

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const instituteIdError = !loginData.instituteId ? 'Institute Id is required' : '';
    const usernameError = validateUsername(loginData.username, false); // false for student login
    const passwordError = validatePassword(loginData.password);
  
    if (instituteIdError || usernameError || passwordError) {
      setErrors({
        ...errors,
        login: { instituteId: instituteIdError, username: usernameError, password: passwordError },
      });
    } else {
      const role = loginData.username.startsWith('S') ? 'Student' : 'Faculty';
      alert(`Login successful! Welcome ${role}, ${loginData.username}`);
      setLoginData({ instituteId: '', username: '', password: '' });
      setErrors({ login: {}, signup: {} }); // Clear errors after successful login
    }
  };
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const instituteIdError = !signupData.instituteId ? 'Institute Id is required' : '';
    const usernameError = validateUsername(signupData.username, true); // true for admin signup
    const passwordError = validatePassword(signupData.password);
  
    if (instituteIdError || usernameError || passwordError) {
      setErrors({
        ...errors,
        signup: { instituteId: instituteIdError, username: usernameError, password: passwordError },
      });
    } else {
      const role = signupData.username.startsWith('F') ? 'Admin' : 'Student';
      alert(`Sign Up successful! Welcome ${role}, ${signupData.username}`);
      setSignupData({ instituteId: '', username: '', password: ''});
      setErrors({ login: {}, signup: {} }); // Clear errors after successful signup
    }
  };
  

  // Dynamic username field styling
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setLoginData({ ...loginData, username });
    const isValid = validateUsername(username) === '';
    setUsernameClass(isValid ? 'input-box valid' : 'input-box invalid');
  };

  // Dynamic password field handling and error clearing
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setLoginData({ ...loginData, password });
    const passwordError = validatePassword(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      login: { ...prevErrors.login, password: passwordError ? passwordError : '' }, // Clear error if valid
    }));
  };

  // Handle Institute Id change for login
  const handleInstituteIdChangeLogin = (e) => {
    const instituteId = e.target.value;
    setLoginData({ ...loginData, instituteId });
    const instituteIdError = !instituteId ? 'Institute Id is required' : '';
    setErrors((prevErrors) => ({
      ...prevErrors,
      login: { ...prevErrors.login, instituteId: instituteIdError ? instituteIdError : '' }, // Clear error if valid
    }));
  };

  // Handle Institute Id change for signup
  const handleInstituteIdChangeSignup = (e) => {
    const instituteId = e.target.value;
    setSignupData({ ...signupData, instituteId });
    const instituteIdError = !instituteId ? 'Institute Id is required' : '';
    setErrors((prevErrors) => ({
      ...prevErrors,
      signup: { ...prevErrors.signup, instituteId: instituteIdError ? instituteIdError : '' }, // Clear error if valid
    }));
  };

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* Login Form */}
      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
          Login
        </h2>
        <form onSubmit={handleLoginSubmit}>
        <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              value={loginData.instituteId}
              onChange={handleInstituteIdChangeLogin}
              required
            />
            <label>Institute Id</label>
            {errors.login.instituteId && <p className="error-message">{errors.login.instituteId}</p>}
          </div>
          <div className={`${usernameClass} animation`} style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              value={loginData.username}
              onChange={handleUsernameChange}
              required
            />
            <label>Username</label>
            {/* <i className="bx bxs-user"></i> */}
            {errors.login.username && <p className="error-message">{errors.login.username}</p>}
          </div>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
            <input
              type="password"
              value={loginData.password}
              onChange={handlePasswordChange}
              required
            />
            <label>Password</label>
            {/* <i className="bx bxs-lock-alt"></i> */}
            {errors.login.password && <p className="error-message">{errors.login.password}</p>}
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
              <a href="#" className="register-link" onClick={handleRegisterClick}>
                Admin Login
              </a>
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
        <form onSubmit={handleSignupSubmit}>
        <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="text"
              value={signupData.instituteId}
              onChange={handleInstituteIdChangeSignup}
              required
            />
            <label>Institute Id</label>
            {errors.login.instituteId && <p className="error-message">{errors.login.instituteId}</p>}
          </div>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              required
            />
            <label>Username</label>
            {/* <i className="bx bxs-user"></i> */}
            {errors.signup.username && <p className="error-message">{errors.signup.username}</p>}
          </div>

          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />
            <label>Password</label>
            {/* <i className="bx bxs-lock-alt"></i> */}
            {errors.signup.password && <p className="error-message">{errors.signup.password}</p>}
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
              <a href="#" className="login-link" onClick={handleLoginClick}>
                Student Login
              </a>
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
