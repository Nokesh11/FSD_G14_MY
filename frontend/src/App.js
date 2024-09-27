import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/Student/StudentDashBoard";
import Login from "./pages/Login";
import AdminLogin from "./pages/SuperAdmin/AdminLogin";
import AdminLayout from "./pages/SuperAdmin/AdminLayout";
import AdminDashboard from "./pages/SuperAdmin/AdminDashboard";
import StudentTimetable from "./pages/Student/StudentTimetable";
import Layout from "./pages/StudentLayout";
import StudentAlmanac from "./pages/Student/StudentAlmanac";
import Attendance from "./pages/Student/Attendance";
import StudentDocVault from "./pages/Student/StudentDocVault";
// import AddUser from "./pages/SuperAdmin/AddUser";
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

function App() {
  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<AddUserCurr />} />
            <Route path="users/edit" element={<EditUser />} />
            {/* Catch-all for /admin */}
            <Route path="" element={<Error404 />} /> {/* Handles /admin */}
            <Route path="*" element={<Error404 />} /> {/* Handles other unmatched paths */}
          </Route>

          {/* Student Routes */}
          <Route path="/student/*" element={<Layout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="docvault" element={<StudentDocVault />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="almanac" element={<StudentAlmanac />} />
            <Route path="scores" element={<CoursesList />} />
            <Route path="scores/:courseid" element={<CoursePage />} />
            {/* Catch-all for /student */}
            <Route path="" element={<Error404 />} /> {/* Handles /student */}
            <Route path="*" element={<Error404 />} /> {/* Handles other unmatched paths */}
          </Route>

          {/* Faculty Routes */}
          <Route path="/faculty/*" element={<Layout />}>
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="attendance" element={<ExcelEditor />} />
            {/* Catch-all for /faculty */}
            <Route path="" element={<Error404 />} /> {/* Handles /faculty */}
            <Route path="*" element={<Error404 />} /> {/* Handles other unmatched paths */}
          </Route>

          {/* Other Routes */}
          <Route path="/test" element={<Error404 />} />
          
          {/* Fallback route for any unmatched paths */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </LoginProvider>
    </Router>
  );
}


export default App;
