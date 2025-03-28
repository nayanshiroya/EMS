import React, { useState, useContext } from "react";
import TaskDiscription from "./TaskDiscription";
import { Authcontext } from "../../context/Authprovider";
import { ThemeContext } from "../../context/ThemeContext";
import CardComponent from "../CardComponent";
import Primary from "../button/Primary";
import Success from "../button/Success";
import Warning from "../button/Warning.jsx";

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
        <CardComponent
          className={`flex-shrink-0 w-[300px] min-h-64  p-5shadow-md rounded-xl border`}
        >
          <div className="flex justify-between items-center">
            <h3>
              <Primary className={`text-sm px-3 py-1 rounded  break-words`}>
                {data.category}
              </Primary>
            </h3>
            <h4 className="text-sm">{data.taskDate}</h4>
          </div>
          <h2 className="mt-5 min-h-20 text-2xl font-semibold  break-words">
            {data.taskTitle}
          </h2>

          <Primary
            onClick={() => setState(false)}
            className={`w-full mt-4 py-2 rounded-lg   font-medium hover:bg-gray-700 transition-all`}
          >
            Full Details
          </Primary>

          <div className="mt-6 flex gap-1">
            <Success
              onClick={handleComplete}
              className={` w-full   rounded-lg font-medium py-2 text-sm transition-all`}
            >
              Mark as Complete
            </Success>

            <Warning
              onClick={handleFailed}
              className={` w-full   rounded-lg font-medium py-2 text-sm transition-all`}
            >
              Mark as failed
            </Warning>
          </div>
        </CardComponent>
      ) : (
        <TaskDiscription data={data} setState={setState} />
      )}
    </>
  );
};

export default AcceptTask;
