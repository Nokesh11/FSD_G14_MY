// src/CoursesList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
    styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../LoginContext";

// Sample course data
const courseData = [
    {
        id: 1,
        title: "Math 101",
        description: "Understanding the basics of Mathematics.",
        image: "https://source.unsplash.com/featured/?math",
    },
    {
        id: 2,
        title: "Physics 101",
        description: "A journey through the laws of Physics.",
        image: "https://source.unsplash.com/featured/?physics",
    },
    {
        id: 3,
        title: "Chemistry 101",
        description: "Dive into the world of Chemistry.",
        image: "https://source.unsplash.com/featured/?chemistry",
    },
    {
        id: 4,
        title: "Computer Science 101",
        description: "Foundations of Computer Science.",
        image: "https://source.unsplash.com/featured/?computer",
    },
    {
        id: 5,
        title: "Computer Science 101",
        description: "Foundations of Computer Science.",
        image: "https://source.unsplash.com/featured/?computer",
    },
    {
        id: 6,
        title: "Computer Science 101",
        description: "Foundations of Computer Science.",
        image: "https://source.unsplash.com/featured/?computer",
    },
    {
        id: 7,
        title: "Computer Science 101",
        description: "Foundations of Computer Science.",
        image: "https://source.unsplash.com/featured/?computer",
    },
    {
        id: 8,
        title: "Computer Science 101",
        description: "Foundations of Computer Science.",
        image: "https://source.unsplash.com/featured/?computer",
    },
];


// Styled components for card
const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px", // Set a fixed height for consistency
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.25)",
    },
}));

const CoursesList = () => {
    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        navigate(`/student/scores/${courseId}`); // Ensure the path is correct
    };
    const { isAuthenticated } = useLogin();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);


    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom align="center">
                Available Courses
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {courseData.map((course) => (
                    <Grid item xs={12} sm={6} md={3} key={course.id}>
                        <StyledCard>
                            <CardActionArea onClick={() => handleCourseClick(course.id)}>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        {course.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CoursesList;
