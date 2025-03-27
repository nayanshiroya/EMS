import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Header = ({ changeuser, data, data11 }) => {
  const { theme, setTheme } = useContext(ThemeContext); // Access theme state

  const logoutuser = () => {
    changeuser("");
    localStorage.setItem("loggedinuser", "");
    data11("");
  };

  // Available Themes
  const themes = [
    {
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
    },
    {
      name: "Dark Mode",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      cardColor: "bg-gray-800",
      buttonStyles: {
        primary: { bg: "bg-purple-500", text: "text-white", hover: "hover:bg-purple-600" },
        success: { bg: "bg-green-500", text: "text-white", hover: "hover:bg-green-600" },
        warning: { bg: "bg-red-500", text: "text-white", hover: "hover:bg-red-600" },
        sortInput: { bg: "bg-indigo-200", text: "text-indigo-900", hover: "hover:bg-indigo-300" },
      },
    },
    {
      name: "Warm Mode",
      bgColor: "bg-yellow-100",
      textColor: "text-orange-700",
      cardColor: "bg-orange-200",
      buttonStyles: {
        primary: { bg: "bg-purple-500", text: "text-white", hover: "hover:bg-purple-600" },
        success: { bg: "bg-green-500", text: "text-white", hover: "hover:bg-green-600" },
        warning: { bg: "bg-red-500", text: "text-white", hover: "hover:bg-red-600" },
        sortInput: { bg: "bg-indigo-200", text: "text-indigo-900", hover: "hover:bg-indigo-300" },
      },
    },
    {
      name: "Cool Mode",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-700",
      cardColor: "bg-blue-200",
      buttonStyles: {
        primary: { bg: "bg-purple-500", text: "text-white", hover: "hover:bg-purple-600" },
        success: { bg: "bg-green-500", text: "text-white", hover: "hover:bg-green-600" },
        warning: { bg: "bg-red-500", text: "text-white", hover: "hover:bg-red-600" },
        sortInput: { bg: "bg-indigo-200", text: "text-indigo-900", hover: "hover:bg-indigo-300" },
      },
    }
  ];

  return (
    <div
      className={`flex justify-between items-center w-full mb-8 p-4 ${theme.cardColor}`}
    >
      <h1 className={`text-2xl font-bold ${theme.textColor}`}>
        {data?.firstName} 👋
      </h1>

      {/* Theme Selection Circles */}
      <div className="flex gap-4">
        {themes.map((t, index) => (
          <div
            key={index}
            onClick={() => setTheme(t)} // Set theme on click
            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${t.cardColor} `}
          />
        ))}
      </div>

      <button
        onClick={logoutuser}
        className={`px-4 py-2 rounded  ${theme.buttonStyles.warning.bg} 
        ${theme.buttonStyles.warning.text} 
        ${theme.buttonStyles.warning.hover} text-white`}
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
