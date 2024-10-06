import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/Student/StudentDashBoard";
import Login from "./pages/Login";
import AdminLogin from "./pages/SuperAdmin/AdminLogin";
import AdminLayout from "./pages/SuperAdmin/AdminLayout";
import StudentTimetable from "./pages/Student/StudentTimetable";
import Layout from "./pages/StudentLayout";
import StudentAlmanac from "./pages/Student/StudentAlmanac";
import Attendance from "./pages/Student/Attendance";
import StudentDocVault from "./pages/Student/StudentDocVault";
// import AddUser from "./pages/SuperAdmin/AddUser";
import AdminDashboard from "./pages/SuperAdmin/AdminDashboard";
import EditUser from "./pages/SuperAdmin/EditUser";
import AddUserCurr from "./pages/SuperAdmin/AddUserCurr";
import Users from "./pages/SuperAdmin/Users";
import Error404 from "./pages/Error-404";
import ExcelEditor from "./components/ExcelSheet";
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoginProvider } from "./LoginContext";
import CoursesList from "./pages/Student/CoursesList";
import CoursePage from "./pages/Student/CoursePage";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";


function App() {
  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                element={<AdminLayout />}
                requiredRole="admin"
              />
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<AddUserCurr />} />
            <Route path="users/edit" element={<EditUser />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          {/* Student Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute
                element={<Layout />}
                requiredRole="student"
              />
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="docvault" element={<StudentDocVault />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="almanac" element={<StudentAlmanac />} />
            <Route path="scores" element={<CoursesList />} />
            <Route path="scores/:courseid" element={<CoursePage />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          {/* Faculty Routes */}
          <Route
            path="/faculty/*"
            element={
              <ProtectedRoute
                element={<Layout />}
                requiredRole="admin"
              />
            }
          >
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="attendance" element={<ExcelEditor />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="almanac" element={<StudentAlmanac />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          {/* Other Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </LoginProvider>
    </Router>
  );
}

export default App;
