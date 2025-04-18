import React, { useState, useContext } from "react";
import { Authcontext } from "../../context/Authprovider";
import TaskDiscription from "./TaskDiscription";
import { ThemeContext } from "../../context/ThemeContext";
import CardComponent from "../CardComponent";
import Primary from "../button/Primary";
import Success from "../button/Success";

const CompleteTask = ({ data, setTaskData, employeeId }) => {
  const [userData, updateEmployeeData] = useContext(Authcontext);
  const [state, setState] = useState(true);

  const { theme } = useContext(ThemeContext);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const updatedEmployees = userData.map((employee) => {
      if (employee.id === employeeId) {
        return {
          ...employee,
          tasks: employee.tasks.filter(
            (task) => task.taskTitle !== data.taskTitle
          ),
          taskCounts: {
            ...employee.taskCounts,
            completed: Math.max((employee.taskCounts.failed || 0) - 1, 0),
          },
        };
      }
      return employee;
    });

    updateEmployeeData(updatedEmployees);
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));
    setTaskData(updatedEmployees.find((emp) => emp.id === employeeId));
  };

  return (
    <>
      {state ? (
        <CardComponent
          className={` flex-shrink-0 w-[300px] min-h-64 p-5  rounded-xl relative`}
        >
          <div className="flex justify-between items-center">
          <h3>
              <Primary className={`text-sm px-3 py-1 rounded`}>
                {data.category}
              </Primary>
            </h3>
            <h4 className="text-sm">{data.taskDate}</h4>
          </div>
          <h2 className="mt-5 min-h-20 text-2xl font-semibold">
            {data.taskTitle}
          </h2>

          <Primary
            onClick={() => setState(false)}
            className={`w-full mt-4 py-2 rounded-lg   font-medium hover:bg-gray-700 transition-all`}
          >
            Full Details
          </Primary>

          <div className="mt-6 flex gap-7">
            <Success className={` w-full  rounded-lg font-medium py-2 text-sm hover:bg-green-600 transition-all`}>
              Complete
            </Success>
          </div>

          <button
            onClick={handleDelete}
            className={`absolute -top-3 -right-3 p-2 rounded-full hover:bg-red-700 shadow-lg`}
            style={{background:theme.cardColor}}
          >
            ❌
          </button>
        </CardComponent>
      ) : (
        <TaskDiscription data={data} setState={setState} />
      )}
    </>
  );
};

export default CompleteTask;
