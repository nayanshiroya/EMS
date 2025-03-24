import React, { useState } from "react";
import TaskDiscription from "./TaskDiscription";




const NewTask = ({ data, setTaskData }) => {
  
  const AcceptTask = () => {
    let employees = JSON.parse(localStorage.getItem("employee")) || [];

    const updatedEmployees = employees.map((employee) => {
      if (employee.tasks.some((task) => task.taskTitle === data.taskTitle)) {
        const updatedTasks = employee.tasks.map((task) =>
          task.taskTitle === data.taskTitle
            ? { ...task, active: true, newTask: false }
            : task
        );

        const updatedEmployee = {
          ...employee,
          tasks: updatedTasks,
          taskCounts: {
            ...employee.taskCounts,
            active: employee.taskCounts.active + 1,
            newTask: Math.max(employee.taskCounts.newTask - 1, 0),
          },
        };

        return updatedEmployee;
      }
      return employee;
    });

    // ✅ Save Updated Employee Data in Local Storage
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));

    // ✅ Update State to Reflect Changes Immediately
    setTaskData(
      updatedEmployees.find((emp) =>
        emp.tasks.some((task) => task.taskTitle === data.taskTitle)
      )
    );
  };

  const [state, setState] = useState(true);

  const discription = () => {
    setState(false);
    
  };


  return (
    <>
      {state ? (
        <div className="flex-shrink-0 w-[300px] min-h-64 p-5 bg-blue-500 shadow-md rounded-xl border border-blue-400 text-white">
          {/* Category & Date */}
          <div className="flex justify-between items-center">
            <h3 className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg">
              {data.category}
            </h3>
            <h4 className="text-xs text-gray-200">{data.taskDate}</h4>
          </div>
  
          {/* Task Title */}
          <h2 className="mt-5 min-h-20 text-2xl font-semibold  break-words">{data.taskTitle}</h2>
  
          {/* Full Details Button */}
          <button
            onClick={discription}
            className="w-full mt-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all"
          >
            Full Details
          </button>
  
          {/* Accept Task Button */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={AcceptTask}
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
