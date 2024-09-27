import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../LoginContext";

function StudentDocVault() {
  const navigate = useNavigate();
  const {isAuthenticated} = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>StudentDocVault</div>
  )
}

export default StudentDocVault