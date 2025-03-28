import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CardComponent = ({ children, className ,key }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
    key={key}
      className={`shadow-md border p-5 rounded-lg ${className}`}
      style={{ background: theme.cardColor, color: theme.textColor }}
    >
      {children}
    </div>
  );
};

export default CardComponent;
