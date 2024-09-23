import React from "react";
import SectionTable from "../../components/SuperAdmin/SectionTable";

function AdminDashboard() {
  const authSections = ["Groups", "Users"];
  const dbTables = ["Students", "Teachers", "Courses"];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 ml-5">Admin Dashboard</h1>
      <SectionTable title="Authentication and Authorization" sections={authSections} />
      <SectionTable title="Institute Database Tables" sections={dbTables} />
    </div>
  );
}

export default AdminDashboard;
