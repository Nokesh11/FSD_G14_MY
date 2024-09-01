// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        primary: '#904dd3',   // Neon Purple for interactive elements
        secondary: '#6d28d9', // Bright purple
        light: {
          background: '#f7f7f7', // White Background
          surface: '#f5f5f5',    // Plain color for fallback
          textPrimary: '#000000', // Black for primary text
          textSecondary: '#555555', // Dark Gray for secondary text
          border: '#dddddd', // Light Gray for borders
        },
        dark: {
          background: '#181818', // Black Background
          surface: '#1a1a1a', // Plain color for fallback
          textPrimary: '#e0e0e0', // Light Gray for primary text
          textSecondary: '#a0a0a0', // Medium Gray for secondary text
          border: '#904dd3', // Neon Purple for borders
        },
        neonYellow: '#e3ff00',
        // neonGreen: '#39ff14',
        neonGreen: '#186c3e',
        neonBlue: '#00ffff',
        neonOrange: '#ff9f1c',
        neonPink: '#ff00ff',
        neonRed: '#ff073a', // Neon Red
        custom: 'var(--user-selected-color)', 
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'], // Font for headings
        body: ['Outfit', 'sans-serif'], // Font for body text
      },
      boxShadow: {
        'neon-custom': '0 0 15px 3px var(--user-selected-color)', // Neon glow effect for custom color
        'light-elevation': '0 4px 6px rgba(0, 0, 0, 0.1)', // Elevation effect for light mode
        'dark-elevation': '0 4px 6px rgba(0, 0, 0, 0.6)', // Elevation effect for dark mode
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to bottom, #ffffff, #f0f0f0)', // Light theme gradient
        'dark-gradient': 'linear-gradient(to bottom, #252a31, #171e26)',  // Dark theme gradient
      },
    },
  },
  plugins: [],
};
