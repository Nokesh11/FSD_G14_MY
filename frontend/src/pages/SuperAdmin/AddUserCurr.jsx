import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function AddUserCurr() {
  // State to store form input values
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [instID, setInstID] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // State for the uploaded file

  // Handle form submission for single user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-user`,
        {
          userID,
          password,
          userType,
          instID,
        }
      );
      setMessage(response.data.message); // Success message
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setMessage(errorMessage); // Display error message
    }finally{
      setUserID("");
      setPassword("");
      setUserType("");
      setInstID("");
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Update the file state
  };

  // Handle form submission for multiple users from Excel file
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload an Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]]; 
      const jsonData = XLSX.utils.sheet_to_json(sheet); 

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/create-multiple-users`,
          jsonData
        );
        setMessage(response.data.message); 
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        setMessage(errorMessage); 
      }
    };

    reader.readAsArrayBuffer(file); 
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Add User
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="userID"
            className="block mb-1 text-gray-700 font-semibold"
          >
            User ID:
          </label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 text-gray-700 font-semibold"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userType"
            className="block mb-1 text-gray-700 font-semibold"
          >
            User Type:
          </label>
          <input
            type="text"
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="instID"
            className="block mb-1 text-gray-700 font-semibold"
          >
            Institution ID:
          </label>
          <input
            type="text"
            id="instID"
            value={instID}
            onChange={(e) => setInstID(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Create User
        </button>
      </form>

      <div className="flex items-center mt-1">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-2 text-gray-700 font-semibold">OR</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Excel file upload section */}
      <div className="mt-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Upload Excel File
        </h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleFileSubmit}
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
        >
          Create Users from Excel
        </button>
      </div>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}

export default AddUserCurr;
