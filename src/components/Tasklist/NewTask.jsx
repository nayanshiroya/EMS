import React, { useState, useContext } from "react";
import TaskDiscription from "./TaskDiscription";
import { Authcontext } from "../../context/Authprovider";
import { ThemeContext } from "../../context/ThemeContext";
import CardComponent from "../CardComponent";
import Primary from "../button/Primary";
import Success from "../button/Success";

const NewTask = ({ data, setTaskData }) => {
  const [userData, updateEmployeeData] = useContext(Authcontext);
  const [state, setState] = useState(true);

  const { theme } = useContext(ThemeContext);

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
        <CardComponent
          className={`flex-shrink-0 w-[300px] min-h-64 p-5  shadow-md rounded-xl border `}
        >
          {/* Category & Date */}
          <div className="flex justify-between items-center">
            <h3>
              <Primary className={`text-sm px-3 py-1 rounded`}>
                {data.category}
              </Primary>
            </h3>
            <h4 className="text-xs">{data.taskDate}</h4>
          </div>

          {/* Task Title */}
          <h2 className="mt-5 min-h-20 text-2xl font-semibold break-words">
            {data.taskTitle}
          </h2>

          {/* Full Details Button */}
          <Primary
            onClick={() => setState(false)}
            className={`w-full mt-4 py-2 rounded-lg   font-medium hover:bg-gray-700 transition-all`}
          >
            Full Details
          </Primary>

          {/* Accept Task Button */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Success
              onClick={handleAcceptTask}
              className={`w-full  rounded-lg font-medium py-2 px-3 text-sm  transition-all`}
            >
              Accept Task
            </Success>
          </div>
        </CardComponent>
      ) : (
        <TaskDiscription data={data} setState={setState} />
      )}
    </>
  );
};

export default NewTask;
