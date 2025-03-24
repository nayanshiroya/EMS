import React, { useState } from "react";
import TaskDiscription from "./TaskDiscription";


const AcceptTask = ({data, setTaskData}) => {
  // console.log(data.taskTitle)
  

  const Complete = () => {
    const isConfirmed = window.confirm("Are you sure you want to mark this task as complete?");
  
  if (!isConfirmed) return;
    let employees = JSON.parse(localStorage.getItem("employee")) || [];

    const updatedEmployees = employees.map((employee) => {
      if (employee.tasks.some((task) => task.taskTitle === data.taskTitle)) {
        const updatedTasks = employee.tasks.map((task) =>
          task.taskTitle === data.taskTitle
            ? { ...task, completed: true, active: false }
            : task
        );

        const updatedEmployee = {
          ...employee,
          tasks: updatedTasks,
          taskCounts: {
            ...employee.taskCounts,
            completed: Math.max((employee.taskCounts.completed || 0) + 1,0),
            active: Math.max((employee.taskCounts.active || 0) - 1, 0),
          },
        };

        return updatedEmployee;
      }
      return employee;
    });

    //  Save Updated Employee Data in Local Storage
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));
    //  Update State to Reflect Changes Immediately
    setTaskData(updatedEmployees.find((emp) => emp.tasks.some((task) => task.taskTitle === data.taskTitle)));
  };
  
  
  const Failed = () => {
    const isConfirmed = window.confirm("Are you sure?");
  
    if (!isConfirmed) return;

    let employees = JSON.parse(localStorage.getItem("employee")) || [];

    const updatedEmployees = employees.map((employee) => {
      if (employee.tasks.some((task) => task.taskTitle === data.taskTitle)) {
        const updatedTasks = employee.tasks.map((task) =>
          task.taskTitle === data.taskTitle
            ? { ...task, failed: true, active: false }
            : task
        );

        const updatedEmployee = {
          ...employee,
          tasks: updatedTasks,
          taskCounts: {
            ...employee.taskCounts,
            failed: employee.taskCounts.failed + 1,
            active: Math.max(employee.taskCounts.active - 1, 0),
          },
        };

        return updatedEmployee;
      }
      return employee;
    });

    //  Save Updated Employee Data in Local Storage
    localStorage.setItem("employee", JSON.stringify(updatedEmployees));
    //  Update State to Reflect Changes Immediately
    setTaskData(updatedEmployees.find((emp) => emp.tasks.some((task) => task.taskTitle === data.taskTitle)));
  };

  const [state, setstate] = useState(true);

  const discription = () => {
    setstate(false);
    
  };

  
  return (
    <>
    
     { state ? <div className="flex-shrink-0 w-[300px] min-h-64  p-5 bg-yellow-400 rounded-xl" >
          <div className="flex justify-between items-center">
            <h3 className="bg-red-600 text-sm px-3 py-1 rounded  break-words">{data.category}</h3>
            <h4 className="text-sm">{data.taskDate}</h4>
          </div>
          <h2 className="mt-5 min-h-20 text-2xl font-semibold  break-words">
            {data.taskTitle}
          </h2>
          {/* <p className="text-sm mt-2 h-16 break-words">     
            {data.taskDescription}
          </p> */}
          <button
            onClick={discription}
            className="w-full mt-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all"
          >
            Full Details
          </button>
          <div className="mt-6 flex gap-1">
            <button onClick={Complete} className="w-full bg-green-500 text-white rounded-lg font-medium py-2 text-sm hover:bg-green-600 transition-all">
              Mark as Complete
            </button>
            <button onClick={Failed} className="w-full bg-red-500 text-white rounded-lg font-medium py-2 text-sm hover:bg-green-600 transition-all">
              Mark as failed
            </button>
          </div>
        </div> : (
          <TaskDiscription data={data} setState={setstate} />
          
        )}
     </>
  )
 }
export default AcceptTask
