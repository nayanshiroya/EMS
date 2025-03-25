import React, { createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employee")) || [];
    setUserData(employees);
  }, []);

  const updateEmployeeData = (updatedEmployees) => {
    setUserData(updatedEmployees); // 🔥 Update `userData` state
    localStorage.setItem("employee", JSON.stringify(updatedEmployees)); // 🔥 Update `localStorage`
  };

  return (
    <Authcontext.Provider value={[userData, updateEmployeeData]}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;
