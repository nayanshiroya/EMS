import React from "react";

const Tasknumber = ({ data, setSelectedFilter }) => {
  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div
          className="bg-blue-500 w-1/4 p-5 rounded-lg cursor-pointer hover:bg-blue-600"
          onClick={() => setSelectedFilter("newTask")}
        >
          <h2 className="text-3xl font-bold">{data.taskCounts.newTask}</h2>
          <p>New Task</p>
        </div>

        <div
          className="bg-green-500 w-1/4 p-5 rounded-lg cursor-pointer hover:bg-green-600"
          onClick={() => setSelectedFilter("completed")}
        >
          <h2 className="text-3xl font-bold">{data.taskCounts.completed}</h2>
          <p>Completed</p>
        </div>

        <div
          className="bg-yellow-500 w-1/4 p-5 rounded-lg cursor-pointer hover:bg-yellow-600"
          onClick={() => setSelectedFilter("active")}
        >
          <h2 className="text-3xl font-bold">{data.taskCounts.active}</h2>
          <p>Accepted</p>
        </div>

        <div
          className="bg-red-500 w-1/4 p-5 rounded-lg cursor-pointer hover:bg-red-600"
          onClick={() => setSelectedFilter("failed")}
        >
          <h2 className="text-3xl font-bold">{data.taskCounts.failed}</h2>
          <p>Failed</p>
        </div>
      </div>
    </div>
  );
};

export default Tasknumber;
