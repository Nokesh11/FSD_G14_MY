import React from 'react';
import PDFViewer from '../../components/AlmanacViewer';
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../LoginContext";

function StudentAlmanac() {

  const navigate = useNavigate();
  const { isAuthenticated } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (<div style={{ padding: "1rem" }}><PDFViewer /></div>);
}

export default StudentAlmanac;
