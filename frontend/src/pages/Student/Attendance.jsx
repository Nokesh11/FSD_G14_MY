import { React, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../LoginContext";

function Attendance() {

  const navigate = useNavigate();
  const { isAuthenticated } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>Attendance</div>
  )
}

export default Attendance