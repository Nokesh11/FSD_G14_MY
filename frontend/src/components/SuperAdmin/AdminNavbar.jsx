import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    return (
      <nav className="bg-gray-800 text-white p-4">
        {/* The container spans full width, but the content inside is restricted to 80vw */}
        <div className="lg:w-[80vw] w-full max-w-[80vw] flex items-center justify-between mx-auto">
          <h1 className="text-xl font-medium">CMS Admin</h1>
          <div className="flex items-center space-x-8">
            <h2 className="text-sm pt-0.5">Welcome, Admin</h2>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="text-sm hover:text-gray-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="text-sm hover:text-gray-300 transition-colors"
                >
                  Users
                </Link>
              </li>
              <li className="pt-1">
                <button
                  className="text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                  onClick={() => alert("Logging out...")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  export default AdminNavbar;