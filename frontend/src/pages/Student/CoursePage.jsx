// src/CoursePage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

// Sample course data with additional fields for marks
const courseData = {
    1: {
        title: "Math 101",
        description: "Basic Mathematics Course",
        content: "This course covers algebra, calculus, and trigonometry.",
        quizMarks: [8, 7, 9],  // Example quiz marks
        assignmentMarks: [7, 8, 9, 10],  // Example assignment marks
        examMarks: [85, 90, 78],  // Example exam marks
    },
    2: {
        title: "Physics 101",
        description: "Introduction to Physics",
        content: "Learn the basics of mechanics, electromagnetism, and optics.",
        quizMarks: [6, 9, 8],
        assignmentMarks: [9, 10, 8, 7],
        examMarks: [88, 92, 80],
    },
    3: {
        title: "Chemistry 101",
        description: "Basic Chemistry Concepts",
        content: "Understand atomic structure, bonding, and chemical reactions.",
        quizMarks: [10, 8, 7],
        assignmentMarks: [8, 9, 7, 8],
        examMarks: [89, 85, 84],
    },
    4: {
        title: "Computer Science 101",
        description: "Intro to CS Concepts",
        content: "An introduction to programming, algorithms, and data structures.",
        quizMarks: [7, 6, 9],
        assignmentMarks: [10, 9, 8, 7],
        examMarks: [90, 94, 88],
    },
};

const CoursePage = () => {
    const { courseid } = useParams();
    const [course, setCourse] = useState(null); // Initialize with null

    useEffect(() => {
        // Simulate a fetch operation with local course data
        const fetchCourseData = () => {
            const data = courseData[courseid]; // Fetch data based on courseid
            setCourse(data); // Set course data from local data
        };

        fetchCourseData();
    }, [courseid]);

    // Handle loading or error states
    if (!course) {
        return <div>Loading...</div>; // Show loading message if data is not available
    }

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom align="center">
                {course.title} - Course Details
            </Typography>
            <Paper elevation={3} style={{ padding: "20px", marginBottom: "30px" }}>
                <Typography variant="h6">Course Description</Typography>
                <Typography>{course.description}</Typography>
                <Typography style={{ marginTop: "15px" }}>{course.content}</Typography>
            </Paper>

            {/* Quiz Marks Section */}
            <Paper elevation={2} style={{ padding: "15px", marginBottom: "20px" }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Quiz Marks
                </Typography>
                <List dense>
                    {course.quizMarks.map((mark, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`Quiz ${index + 1}: ${mark}/10`} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Assignment Marks Section */}
            <Paper elevation={2} style={{ padding: "15px", marginBottom: "20px" }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Assignment Marks
                </Typography>
                <List dense>
                    {course.assignmentMarks.map((mark, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`Assignment ${index + 1}: ${mark}/10`} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Exam Marks Section */}
            <Paper elevation={2} style={{ padding: "15px", marginBottom: "20px" }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Exam Marks
                </Typography>
                <List dense>
                    {course.examMarks.map((mark, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`Exam ${index + 1}: ${mark}/100`} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default CoursePage;
