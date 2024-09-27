// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import CoursesList from "./CoursesList";
import CoursePage from "./CoursePage";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../LoginContext";

function Scores() {

    const navigate = useNavigate();
    const { isAuthenticated } = useLogin();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Router>
            <Container sx={{ padding: "20px" }}>
                <Box sx={{ marginBottom: "20px" }}>
                    <Typography variant="h4" align="center">
                        Course Dashboard
                    </Typography>
                </Box>
                <Routes>
                    {/* Main Course List Page */}
                    <Route path="/" element={<CoursesList />} />

                    {/* Course Details Page */}
                    <Route path="/course/:courseId" element={<CoursePage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default Scores;
