import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      {/* Oops Text with Galaxy Background */}
      <h1 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-800 to-blue-600">
        Oops!
      </h1>
      
      {/* 404 - Page Not Found */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        404 - PAGE NOT FOUND
      </h2>
      
      {/* Description Text */}
      <p className="text-lg text-gray-500 mt-2 max-w-md mx-auto">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      
      {/* Go to Homepage Button */}
      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition duration-300">
          GO TO HOMEPAGE
        </button>
      </Link>
    </div>
  );
};

export default Error404;