import React, { createContext, useEffect, useState } from "react";
import { cn } from "../utils/utils";

// Create Theme Context
export const ThemeContext = createContext();

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(  {
    name: "Light Mode",
    bgColor: "#FFFFFF", // bg-white
    textColor: "#000000", // text-black
    cardColor: "#F3F4F6", // bg-gray-100
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
  },);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={"min-h-screen text-center"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider


