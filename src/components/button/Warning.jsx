import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Warning = ({children, className,onClick}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button
    onClick={onClick}

      className={`${className}`}
      style={{
        background: theme.buttonStyles.warning.bg,
        color: theme.buttonStyles.warning.text,
        hover: theme.buttonStyles.warning.hover,
      }}
    >
      {children}
    </button>
  );
};

export default Warning;
