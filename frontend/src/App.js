import React, { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#904dd3"); // Default to neon purple

  // Apply selected color to the root CSS variable
  document.documentElement.style.setProperty(
    "--user-selected-color",
    selectedColor
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 m-4 border border-gray-300 rounded"
      >
        Toggle Theme
      </button>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setSelectedColor("#e3ff00")}
          className="bg-neonYellow p-2 rounded"
        >
          Neon Yellow
        </button>
        <button
          onClick={() => setSelectedColor("#7bdeba")}
          className="bg-neonGreen p-2 rounded"
        >
          Neon Green
        </button>
        <button
          onClick={() => setSelectedColor("#00ffff")}
          className="bg-neonBlue p-2 rounded"
        >
          Neon Blue
        </button>
        <button
          onClick={() => setSelectedColor("#ff9f1c")}
          className="bg-neonOrange p-2 rounded"
        >
          Neon Orange
        </button>
        <button
          onClick={() => setSelectedColor("#ff00ff")}
          className="bg-neonPink p-2 rounded"
        >
          Neon Pink
        </button>
        <button
          onClick={() => setSelectedColor("#ff073a")}
          className="bg-neonRed p-2 rounded"
        >
          Neon Red
        </button>
      </div>

      <div
        className={`bg-light-background dark:bg-dark-background 
           text-light-textPrimary dark:text-dark-textPrimary
           border-light-border dark:border-dark-border
           p-4 m-4 rounded-lg shadow-neon-custom transition duration-300`}
      >
        <h1 className="text-3xl  font-normal text-custom">
          IIIT Sri City
        </h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary font-body">
          This is a sample text for the {isDarkMode ? "Dark" : "Light"} Theme.
        </p>
        <button className="bg-custom hover:bg-secondary text-white dark:text-dark-background p-2 rounded">
          Click Me
        </button>

        <div
          className={`p-6 m-4 rounded-lg 
    ${isDarkMode ? "shadow-dark-elevation" : "shadow-light-elevation"} 
    ${isDarkMode ? "bg-dark-gradient" : "bg-light-gradient"}
    text-light-textPrimary dark:text-dark-textPrimary 
    w-96 transform transition-all duration-300 hover:scale-105 
    dark:hover:shadow-neon-custom`} // Ensure shadow transition is included
        >
          <h2 className="text-2xl font-heading font-bold text-custom">
            Card Title
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            This card has a gradient background based on the current theme.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
