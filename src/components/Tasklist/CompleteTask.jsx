import {React, useState} from 'react'
import TaskDiscription from './TaskDiscription';
import { getlocalstorage } from "../../utils/localstorage";


const CompleteTask = ({ data, setTaskData, employeeId}) => {

  const [state, setstate] = useState(true);

  const discription = () => {
    setstate(false);
    
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      // Fetch employee data from local storage
      const localData = getlocalstorage();
      const updatedEmployees = localData.employee.map((employee) => {
        if (employee.id === employeeId) {
          return {
            ...employee,
            tasks: employee.tasks.filter((task) => task.taskTitle !== data.taskTitle),
            taskCounts: {
              ...employee.taskCounts,
              failed: Math.max((employee.taskCounts.failed) - 1,0), // Update failed count
            },
          };
        }
        return employee;
      });

      // Update local storage
      localStorage.setItem("employee", JSON.stringify(updatedEmployees));

      // Update state in EmployeeDashboard
      setTaskData(updatedEmployees.find(emp => emp.id === employeeId));
    }
  };

  return (
    <>
   { state ? <div className="flex-shrink-0 w-[300px] min-h-64 p-5 bg-green-500 rounded-xl relative">
    <div className="flex justify-between items-center">
      <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
      <h4 className="text-sm">{data.taskDate}</h4>
    </div>
    <h2 className="mt-5 min-h-20 text-2xl font-semibold">
    {data.taskTitle}

    </h2>
    {/* <p className="text-sm mt-2 h-16 break-word">
    {data.taskDescription}

    </p> */}
    <button
            onClick={discription}
            className="w-full mt-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all"
          >
            Full Details
          </button>
    <div className="mt-6 flex gap-7">
      <button className="w-full bg-green-700 text-white rounded-lg font-medium py-2 text-sm hover:bg-green-600 transition-all">
       Complete
      </button>
      <button
        onClick={handleDelete}
        className="absolute -top-3 -right-3 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 shadow-lg"
      >
        ❌
      </button>
    </div>
  </div> : (
          <TaskDiscription data={data} setState={setstate} />
        )}
  </>
  )
  
}

export default CompleteTask
