import React, { useState, useContext } from "react";
import { Authcontext } from "../../context/Authprovider";
import TaskDiscription from "./TaskDiscription";

const FailedTask = ({ data, setTaskData, employeeId }) => {
  const [userData, updateEmployeeData] = useContext(Authcontext);
  const [state, setState] = useState(true);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const updatedEmployees = userData.map((employee) => {
      if (employee.id === employeeId) {
        return {
          ...employee,
          tasks: employee.tasks.filter((task) => task.taskTitle !== data.taskTitle),
          taskCounts: {
            ...employee.taskCounts,
            failed: Math.max((employee.taskCounts.failed || 0) - 1, 0),
          },
        };
      }
      return employee;
    });

    updateEmployeeData(updatedEmployees);
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));
    setTaskData(updatedEmployees.find((emp) => emp.id === employeeId));
  };

  const markAsFailed = () => {
    if (!window.confirm("Are you sure?")) return;

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
    setTaskData(updatedEmployees.find((emp) => emp.tasks.some((task) => task.taskTitle === data.taskTitle)));
  };

  return (
    <>
      {state ? (
        <div className="flex-shrink-0 w-[300px] min-h-64 p-5 bg-blue-500 rounded-xl relative">
          <div className="flex justify-between items-center">
            <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
            <h4 className="text-sm ml-auto">{data.taskDate}</h4>
          </div>
          <h2 className="mt-5 min-h-20 text-2xl font-semibold">{data.taskTitle}</h2>

          <button
            onClick={() => setState(false)}
            className="w-full mt-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all"
          >
            Full Details
          </button>

          <div className="mt-6 flex gap-7">
            <button
              onClick={markAsFailed}
              className="w-full bg-red-500 text-white rounded-lg font-medium py-2 text-sm hover:bg-red-600 transition-all"
            >
              Failed
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="absolute -top-3 -right-3 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 shadow-lg"
          >
            ❌
          </button>
        </div>
      ) : (
        <TaskDiscription data={data} setState={setState} />
      )}
    </>
  );
};

export default FailedTask;
