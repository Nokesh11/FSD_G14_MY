import React, { useState } from 'react';    
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [institute_ID, setInstitute_ID] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        const trimmedInstitute_ID = institute_ID.trim();
        const trimmedPassword = password.trim();

        if (!trimmedInstitute_ID) {
            newErrors.institute_ID = "Institute ID is required.";
        }
        if (!trimmedPassword) {
            newErrors.password = "Password is required.";
        } else if (trimmedPassword.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            alert("Form submitted successfully! \nInstitute ID: " + institute_ID + "\nPassword: " + password);
            navigate("/admin/dashboard");
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="w-screen flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-100">
            <form onSubmit={handleSubmit} className="flex flex-col w-96 p-8 rounded-lg shadow-lg bg-white bg-opacity-80 box-shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Admin Login</h2>
                <label className="mb-2 text-gray-700 font-medium">
                    Institute ID
                    <input
                        type="text"
                        value={institute_ID}
                        onChange={(e) => {
                            setInstitute_ID(e.target.value);
                            if (e.target.value) {
                                setErrors((prevErrors) => ({ ...prevErrors, institute_ID: undefined }));
                            }
                        }}
                        required
                        className={`block w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 ${errors.institute_ID ? 'border-red-500' : ''}`}
                    />
                    {errors.institute_ID && <p className="mt-1 text-red-500 text-sm">{errors.institute_ID}</p>}
                </label>
                <label className="mb-4 text-gray-700 font-medium">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (e.target.value) {
                                setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
                            }
                        }}
                        required
                        className={`block w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                </label>
                <button type="submit" className="p-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition duration-200">
                    Login
                </button>
                <p className="mt-4 text-center text-teal-500 cursor-pointer">Forgot your password?</p>
            </form>
        </div>
    );
};

export default AdminLogin;
