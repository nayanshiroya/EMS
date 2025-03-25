import React, { useState, useContext } from "react";
import TaskDiscription from "./TaskDiscription";
import { Authcontext } from "../../context/Authprovider";

const NewTask = ({ data, setTaskData, boxColor, textColor }) => {
  const [userData, updateEmployeeData] = useContext(Authcontext);
  const [state, setState] = useState(true);

  const handleAcceptTask = () => {
    const updatedEmployees = userData.map((employee) => {
      if (employee.tasks.some((task) => task.taskTitle === data.taskTitle)) {
        const updatedTasks = employee.tasks.map((task) =>
          task.taskTitle === data.taskTitle
            ? { ...task, active: true, newTask: false }
            : task
        );

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: {
            ...employee.taskCounts,
            active: (employee.taskCounts.active || 0) + 1,
            newTask: Math.max((employee.taskCounts.newTask || 0) - 1, 0),
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
          style={{ backgroundColor: boxColor, color: textColor }}
          className="flex-shrink-0 w-[300px] min-h-64 p-5 bg-blue-500 shadow-md rounded-xl border border-blue-400 text-white"
        >
          {/* Category & Date */}
          <div className="flex justify-between items-center">
            <h3
              style={{
                color: textColor,
                background:boxColor,
                border:"2px solid black",
              }}
              className=" text-xs px-3 py-1 rounded-lg border-black-500"
            >
              {data.category}
            </h3>
            <h4
              style={{
                color: textColor,
              }}
              className="text-xs text-gray-200"
            >
              {data.taskDate}
            </h4>
          </div>

          {/* Task Title */}
          <h2
            style={{
              color: textColor,
            }}
            className="mt-5 min-h-20 text-2xl font-semibold break-words"
          >
            {data.taskTitle}
          </h2>

          {/* Full Details Button */}
          <button
            style={{
              color: textColor,
              background:boxColor,
              border:"2px solid black",
            }}
            onClick={() => setState(false)}
            className="w-full mt-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all"
          >
            Full Details
          </button>

          {/* Accept Task Button */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              style={{
                color: textColor,
                background:boxColor,
                border:"2px solid black",
              }}
              onClick={handleAcceptTask}
              className="w-full bg-green-500 text-white rounded-lg font-medium py-2 px-3 text-sm hover:bg-green-600 transition-all"
            >
              Accept Task
            </button>
          </div>
        </div>
      ) : (
        <TaskDiscription data={data} setState={setState} />
      )}
    </>
  );
};

export default NewTask;
