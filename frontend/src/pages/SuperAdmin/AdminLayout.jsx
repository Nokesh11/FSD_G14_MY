import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/SuperAdmin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-[100vw] bg-gray-100 overflow-x-hidden">
      <AdminNavbar />
      <main className="p-6 w-full lg:w-[80vw] max-w-[80vw] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
