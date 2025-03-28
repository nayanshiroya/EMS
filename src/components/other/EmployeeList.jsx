import React, { useContext, useState } from "react";
import { Authcontext } from "../../context/Authprovider";
import { ThemeContext } from "../../context/ThemeContext";
import Success from "../button/Success.jsx";
import Warning from "../button/Warning.jsx";

const EmployeeList = () => {
  const [userData, setUserData] = useContext(Authcontext);
  const [employeeName, setEmployeeName] = useState("");
  const [removeEmployeeId, setRemoveEmployeeId] = useState(""); // New state for ID input
  const { theme } = useContext(ThemeContext);
  // Function to add an employee
  const addEmployeeHandler = () => {
    if (!employeeName.trim()) return alert("Enter a valid employee name");

    const lowerCaseName = employeeName.toLowerCase();

    // Check if employee already exists
    const employeeExists = userData.some(
      (employee) => employee.firstName.toLowerCase() === lowerCaseName
    );

    if (employeeExists) {
      alert("Employee already exists!");
      return;
    }

    // Capitalize first letter
    const capitalizeFirstLetter = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const formattedName = capitalizeFirstLetter(employeeName);

    // Get the next ID based on the current number of employees
    const nextId = userData.length + 1;

    const newEmployeeData = {
      id: nextId.toString(), // Assigning sequential ID
      firstName: formattedName,
      email: `${formattedName.toLowerCase()}@e.com`,
      password: "123",
      taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0,
      },
      tasks: [],
    };

    const updatedData = [...userData, newEmployeeData];
    setUserData(updatedData);
    localStorage.setItem("employee", JSON.stringify(updatedData));
    setEmployeeName(""); // Clear input field
  };

  // Function to remove an employee by ID
  const removeEmployeeHandler = () => {
    if (!removeEmployeeId.trim())
      return alert("Enter the Employee ID to remove!");

    // Check if the employee exists
    if (!userData.some((emp) => emp.id === removeEmployeeId)) {
      alert("Employee ID not found!");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to remove Employee ID ${removeEmployeeId}?`
      )
    ) {
      return;
    }

    // Filter out the removed employee and reassign IDs sequentially
    const updatedData = userData
      .filter((employee) => employee.id !== removeEmployeeId)
      .map((employee, index) => ({
        ...employee,
        id: (index + 1).toString(), // Reassign IDs sequentially
      }));

    setUserData(updatedData);
    localStorage.setItem("employee", JSON.stringify(updatedData));
    alert(`Employee with ID ${removeEmployeeId} has been removed.`);
    setRemoveEmployeeId(""); // Clear input field
  };

  return (
    <div className="mt-6 p-5 gap-2 flex justify-between">
      {/* Add Employee Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Employee name"
          className={`p-2 rounded border border-gray-700 `}
          style={{background:theme.cardColor,color:theme.textColor}}
        />
        <Success
          onClick={addEmployeeHandler}
          className={`p-2 rounded  font-bold`}
        >
          Add Employee
        </Success>
      </div>

      {/* Remove Employee Section (Using ID) */}
      <div className="flex gap-2 ">
        <input
          type="text"
          value={removeEmployeeId}
          onChange={(e) => setRemoveEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          className={`p-2 rounded border border-gray-700 `}
          style={{background:theme.cardColor,color:theme.textColor}}

        />
        <Warning
          onClick={removeEmployeeHandler}
          className={` p-2 rounded  font-bold`}
        >
          Remove Employee
        </Warning>
      </div>
    </div>
  );
};

export default EmployeeList;
