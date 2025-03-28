import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CardComponent = ({ children, className ,key }) => {
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  console.log(theme.cardColor);
  return (
    <div
    key={key}
      className={`shadow-md border p-5 rounded-lg cursor-pointer ${className}`}
      style={{ background: theme.cardColor, color: theme.textColor }}
    >
      {children}
    </div>
  );
};

export default CardComponent;
