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

function App() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const [selectedColor, setSelectedColor] = useState("#904dd3"); // Default to neon purple

  // // Apply selected color to the root CSS variable
  // document.documentElement.style.setProperty(
  //   "--user-selected-color",
  //   selectedColor
  // );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/student" element={<Layout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="docvault" element={<StudentDocVault />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="almanac" element={<StudentAlmanac />} />
          <Route path="scores" element={<StudentAlmanac />} />
        </Route>
        <Route path="/faculty" element={<Layout />}>
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="attendance" element={<ExcelEditor />} />
        </Route>
        <Route path="/test" element={<Error404 />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUserCurr />} />
          <Route path="users/edit" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
