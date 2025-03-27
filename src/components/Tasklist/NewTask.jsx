import React, { useState, useContext } from "react";
import TaskDiscription from "./TaskDiscription";
import { Authcontext } from "../../context/Authprovider";
import { ThemeContext } from "../../context/ThemeContext";

const NewTask = ({ data, setTaskData }) => {
  const [userData, updateEmployeeData] = useContext(Authcontext);
  const [state, setState] = useState(true);

  const {theme} = useContext(ThemeContext)

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

    setTaskData(updatedEmployees.find((emp) =>
      emp.tasks.some((task) => task.taskTitle === data.taskTitle)
    ));
  };

  return (
    <>
      {state ? (
        <div className={`flex-shrink-0 w-[300px] min-h-64 p-5 ${theme.cardColor}  ${theme.textColor} shadow-md rounded-xl border `}>
          {/* Category & Date */}
          <div className="flex justify-between items-center">
          <h3 className={`${theme.cardColor} text-xs px-3 py-1 rounded-lg `}>

              {data.category}
            </h3>
            <h4 className="text-xs">{data.taskDate}</h4>
          </div>

          {/* Task Title */}
          <h2 className="mt-5 min-h-20 text-2xl font-semibold break-words">
            {data.taskTitle}
          </h2>

          {/* Full Details Button */}
          <button
            onClick={() => setState(false)}
            className={`w-full mt-4 py-2 rounded-lg ${theme.buttonStyles.primary.bg} 
            ${theme.buttonStyles.primary.text} 
            ${theme.buttonStyles.primary.hover}  font-medium hover:bg-gray-700 transition-all`}
          >
            Full Details
          </button>

          {/* Accept Task Button */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleAcceptTask}
              className={`w-full ${theme?.buttonStyles?.success?.bg} ${theme?.buttonStyles?.success?.text} ${theme?.buttonStyles?.success?.hover} rounded-lg font-medium py-2 px-3 text-sm  transition-all`}
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
