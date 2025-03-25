import React, { useContext } from "react";
import { Authcontext } from "../../context/Authprovider";

const Alltask = () => {
  const [userData] = useContext(Authcontext);

  // If no employees exist, show a message
  if (!userData || userData.length === 0) {
    return (
      <div className="bg-[#1c1c1c] p-5 rounded mt-5 text-white text-center">
        <h2 className="text-lg font-medium">No Employees Found</h2>
        <p className="text-gray-400">Add an employee to view tasks.</p>
      </div>
    );
  }

  // Sort employees based on latest task updates
  const sortedUserData = [...userData].sort((a, b) => {
    const aLastUpdate = a.lastUpdated || 0;
    const bLastUpdate = b.lastUpdated || 0;
    return bLastUpdate - aLastUpdate; // Sort descending (most recent first)
  });

  const showemployee = () => {
   
  }

  return (
    <div id="Tasklist" className="bg-[#1c1c1c] p-5 rounded mt-5">
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/6">Id</h2>
        <h2 className="text-lg font-medium w-1/6">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/6">New Task</h3>
        <h5 className="text-lg font-medium w-1/6">Active Task</h5>
        <h5 className="text-lg font-medium w-1/6">Completed</h5>
        <h5 className="text-lg font-medium w-1/6">Faileeeed</h5>
      </div>
      <div>
        {sortedUserData.map((elem, idx) => (
          <div
            key={idx}
            className="border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded"
          >
            <h2 className="text-lg font-medium w-1/5">{elem.id}</h2>
            <h2 onClick={showemployee} className="text-lg font-medium w-1/5">{elem.firstName}</h2>
            <h3 className="text-lg font-medium w-1/5 text-blue-400">
              {elem.taskCounts.newTask}
            </h3>
            <h5 className="text-lg font-medium w-1/5 text-yellow-400">
              {elem.taskCounts.active}
            </h5>
            <h5 className="text-lg font-medium w-1/5 text-white">
              {elem.taskCounts.completed}
            </h5>
            <h5 className="text-lg font-medium w-1/5 text-red-600">
              {elem.taskCounts.failed}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alltask;
