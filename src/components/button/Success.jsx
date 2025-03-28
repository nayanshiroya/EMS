import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Success = ({ children, className, onClick }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      style={{
        background: theme.buttonStyles.success.bg,
        color: theme.buttonStyles.success.text,
        hover: theme.buttonStyles.success.hover,
      }}
    >
      {children}
    </button>
  );
};

export default Success;
