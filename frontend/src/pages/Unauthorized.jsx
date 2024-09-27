import React from 'react';

const Unauthorized = () => {
  return (
    <div
      className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-200 via-purple-200 to-white text-black"
    >
      <h1 className="text-9xl font-bold">403</h1>
      <p className="text-3xl font-semibold mt-4">Unauthorized</p>
      <p className="text-center max-w-md mt-4 text-lg">
        This server could not verify that you are authorized to access the document requested.
        Either you supplied the wrong credentials (e.g., bad password).
      </p>

      <div className="mt-6">
        <button 
          className="px-6 py-3 bg-blue-400 text-white rounded hover:bg-blue-300"
          onClick={() => window.location.href = '/'}  // Redirect to the home page
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;