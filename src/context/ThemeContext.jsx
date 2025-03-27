import React, { createContext, useState } from "react";

// Create Theme Context
export const ThemeContext = createContext();

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(  {
    name: "Light Mode",
    bgColor: "bg-white",
    textColor: "text-black",
    cardColor: "bg-gray-100",
    buttonStyles: {
      primary: { bg: "bg-purple-500", text: "text-white", hover: "hover:bg-purple-600" },
      success: { bg: "bg-green-500", text: "text-white", hover: "hover:bg-green-600" },
      warning: { bg: "bg-red-500", text: "text-white", hover: "hover:bg-red-600" },
      sortInput: { bg: "bg-indigo-200", text: "text-indigo-900", hover: "hover:bg-indigo-300" },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={` min-h-screen text-center`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider


