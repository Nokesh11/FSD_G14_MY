import React, { useEffect } from 'react';
import PDFViewer from '../../components/TimeTableViewer';
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../LoginContext";

function StudentTimetable() {

  const navigate = useNavigate();
  const { isAuthenticated } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (<div style={{ padding: "1rem" }}><PDFViewer /></div>);
}

export default StudentTimetable;
