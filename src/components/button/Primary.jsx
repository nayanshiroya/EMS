import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Primary = ({ children, className, onClick }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      style={{
        background: theme.buttonStyles.primary.bg,
        color: theme.buttonStyles.primary.text,
        hover: theme.buttonStyles.primary.hover,
      }}
    >
      {children}
    </button>
  );
};

export default Primary;
