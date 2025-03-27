import React, { useState, useContext } from "react";
import TaskDiscription from "./TaskDiscription";
import { Authcontext } from "../../context/Authprovider";
import { ThemeContext } from "../../context/ThemeContext";

const AcceptTask = ({ data, setTaskData }) => {
  const [userData, updateEmployeeData] = useContext(Authcontext);
  const [state, setState] = useState(true);

  const { theme } = useContext(ThemeContext);

  const handleComplete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to mark this task as complete?"
    );
    if (!isConfirmed) return;

    const updatedEmployees = userData.map((employee) => {
      if (employee.tasks.some((task) => task.taskTitle === data.taskTitle)) {
        const updatedTasks = employee.tasks.map((task) =>
          task.taskTitle === data.taskTitle
            ? { ...task, completed: true, active: false }
            : task
        );

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: {
            ...employee.taskCounts,
            completed: (employee.taskCounts.completed || 0) + 1,
            active: Math.max((employee.taskCounts.active || 0) - 1, 0),
          },
          lastUpdated: Date.now(),
        };
      }
      return employee;
    });

    updateEmployeeData(updatedEmployees);
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));

    setTaskData(
      updatedEmployees.find((emp) =>
        emp.tasks.some((task) => task.taskTitle === data.taskTitle)
      )
    );
  };

  const handleFailed = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;

    const updatedEmployees = userData.map((employee) => {
      if (employee.tasks.some((task) => task.taskTitle === data.taskTitle)) {
        const updatedTasks = employee.tasks.map((task) =>
          task.taskTitle === data.taskTitle
            ? { ...task, failed: true, active: false }
            : task
        );

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: {
            ...employee.taskCounts,
            failed: (employee.taskCounts.failed || 0) + 1,
            active: Math.max((employee.taskCounts.active || 0) - 1, 0),
          },
        };
      }
      return employee;
    });

    updateEmployeeData(updatedEmployees);
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));

    setTaskData(
      updatedEmployees.find((emp) =>
        emp.tasks.some((task) => task.taskTitle === data.taskTitle)
      )
    );
  };

  return (
    <>
      {state ? (
        <div
          className={`flex-shrink-0 w-[300px] min-h-64  p-5 ${theme.cardColor}  ${theme.textColor} shadow-md rounded-xl border`}
        >
          <div className="flex justify-between items-center">
            <h3
              className={`${theme.buttonStyles.primary.bg} 
              ${theme.buttonStyles.primary.text} 
              ${theme.buttonStyles.primary.hover}  text-sm px-3 py-1 rounded  break-words`}
            >
              {data.category}
            </h3>
            <h4 className="text-sm">{data.taskDate}</h4>
          </div>
          <h2 className="mt-5 min-h-20 text-2xl font-semibold  break-words">
            {data.taskTitle}
          </h2>

          <button
            onClick={() => setState(false)}
            className={`w-full mt-4 py-2 rounded-lg ${theme.buttonStyles.primary.bg} 
            ${theme.buttonStyles.primary.text} 
            ${theme.buttonStyles.primary.hover}  font-medium hover:bg-gray-700 transition-all`}
          >
            Full Details
          </button>

          <div className="mt-6 flex gap-1">
            <button
              onClick={handleComplete}
              className={`${theme.buttonStyles.success.bg} 
              ${theme.buttonStyles.success.text} 
              ${theme.buttonStyles.success.hover} w-full   rounded-lg font-medium py-2 text-sm transition-all`}
            >
              Mark as Complete
            </button>
            <button
              onClick={handleFailed}
              className={`${theme.buttonStyles.warning.bg} 
              ${theme.buttonStyles.warning.text} 
              ${theme.buttonStyles.warning.hover} w-full   rounded-lg font-medium py-2 text-sm transition-all`}
            >
              Mark as failed
            </button>
          </div>
        </div>
      ) : (
        <TaskDiscription data={data} setState={setState} />
      )}
    </>
  );
};

export default AcceptTask;
