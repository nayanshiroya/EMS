import React, { createContext, useEffect, useState } from "react";

// Create Theme Context
export const ThemeContext = createContext();

// Theme Provider
const ThemeProvider = ({ children }) => {
  const defaultTheme = {
    name: "Dark Mode",
    bgColor: "#111827", // bg-gray-900
    textColor: "#FFFFFF", // text-white
    cardColor: "#1F2937", // bg-gray-800
    buttonStyles: {
      primary: {
        bg: "#A855F7", // bg-purple-500
        text: "#FFFFFF", // text-white
        hover: "#9333EA", // hover:bg-purple-600
      },
      success: {
        bg: "#10B981", // bg-green-500
        text: "#FFFFFF", // text-white
        hover: "#059669", // hover:bg-green-600
      },
      warning: {
        bg: "#EF4444", // bg-red-500
        text: "#FFFFFF", // text-white
        hover: "#DC2626", // hover:bg-red-600
      },
      sortInput: {
        bg: "#E0E7FF", // bg-indigo-200
        text: "#1E3A8A", // text-indigo-900
        hover: "#C3DAFE", // hover:bg-indigo-300
      },
    },
  };

  const [theme, setTheme] = useState(() => {
    // Load from local storage, or use default theme
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : defaultTheme;
  });

  useEffect(() => {
    // Save theme to local storage whenever it changes
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={"min-h-screen text-center"}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;