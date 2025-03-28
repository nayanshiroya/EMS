import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Settings from "./Settings";
import CardComponent from "../CardComponent";
import Warning from "../button/Warning.jsx";

const Header = ({ changeuser, data, data11 }) => {
  const { theme } = useContext(ThemeContext);
  const [showSettings, setShowSettings] = useState(false);

  const logoutuser = () => {
    changeuser("");
    localStorage.setItem("loggedinuser", "");
    data11("");

    console.log("logout")
  };

  return (
    <>
      <CardComponent
        className={`flex justify-between items-center w-full mb-8 p-4`}
      >
        <h1 style={{ color: theme.textColor }} className={`text-2xl font-bold`}>
          {data?.firstName} 👋
        </h1>

        {/* Settings Button */}
        <div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 mr-3 rounded hover:bg-gray-200"
          >
            ⚙️
          </button>

          {/* Logout Button */}
          <Warning onClick={logoutuser} className={`px-4 py-2 rounded `}>
            Log Out
          </Warning>
        </div>
        {/* Settings Panel */}
        {showSettings && (
          <Settings closeSettings={() => setShowSettings(false)} />
        )}
      </CardComponent>
    </>
  );
};

export default Header;
