import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/Student/StudentDashBoard";
import Login from "./pages/Login";
import AdminLogin from "./pages/SuperAdmin/AdminLogin";
import AdminLayout from "./pages/SuperAdmin/AdminLayout";
import AdminDashboard from "./pages/SuperAdmin/AdminDashboard";
import StudentTimetable from "./pages/Student/StudentTimetable";
import StudentLayout from "./pages/Student/StudentLayout";
import StudentAlmanac from "./pages/Student/StudentAlmanac";
import Attendance from "./pages/Student/Attendance";
import StudentDocVault from "./pages/Student/StudentDocVault";

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
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="docvault" element={<StudentDocVault />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="almanac" element={<StudentAlmanac />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
