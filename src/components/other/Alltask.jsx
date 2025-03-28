import React, { useContext } from "react";
import { Authcontext } from "../../context/Authprovider";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import CardComponent from "../CardComponent";

const Alltask = () => {
  // const navigate = useNavigate();

  const [userData] = useContext(Authcontext);

  const { theme } = useContext(ThemeContext);

  console.log(userData);

  // If no employees exist, show a message
  if (!userData || userData.length === 0) {
    return (
      <CardComponent className=" p-5 rounded mt-5 text-center">
        <h2 className="text-lg font-medium">No Employees Found</h2>
        <p className="text-gray-400">Add an employee to view tasks.</p>
      </CardComponent>
    );
  }

  // Sort employees based on latest task updates
  const sortedUserData = [...userData].sort((a, b) => {
    const aLastUpdate = a.lastUpdated || 0;
    const bLastUpdate = b.lastUpdated || 0;
    return bLastUpdate - aLastUpdate; // Sort descending (most recent first)
  });

  const showemployee = (id) => {
    const existingData = JSON.parse(localStorage.getItem("loggedinuser")) || {};
    const updatedData = {
      ...existingData,
      role: "employee",
      data: userData.find((e) => e.id === id),
    };

    localStorage.setItem("loggedinuser", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("storage")); // Trigger storage event to update state
    // navigate(`/employee/${id}`); // Navigate to employee dashboard with correct ID
  };

  return (
    <div id="Tasklist" className=" p-5 rounded mt-5">
      <CardComponent
        className={` mb-2 border-2 py-2 px-4 flex justify-between rounded`}
      >
        <h2 className="text-lg font-medium w-1/6">Id</h2>
        <h2 className="text-lg font-medium w-1/6">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/6">New Task</h3>
        <h5 className="text-lg font-medium w-1/6">Active Task</h5>
        <h5 className="text-lg font-medium w-1/6">Completed</h5>
        <h5 className="text-lg font-medium w-1/6">Failed</h5>
      </CardComponent>
      <div>
        {sortedUserData.map((elem, idx) => {
          const hasTasks =
            elem.taskCounts.newTask > 0 ||
            elem.taskCounts.active > 0 ||
            elem.taskCounts.completed > 0 ||
            elem.taskCounts.failed > 0;

          return (
            <CardComponent
              key={idx}
              className={`border-2  mb-2 py-2 px-4 flex justify-between rounded`}
            >
              <h2 className="text-lg font-medium w-1/5">{elem.id}</h2>

              {hasTasks ? (
                <Link
                  to={`/employee/${elem.id}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default <Link> behavior
                    showemployee(elem.id); // Pass employee ID
                  }}
                  className="text-lg font-medium w-1/5 underline cursor-pointer"
                >
                  {elem.firstName}
                </Link>
              ) : (
                <span style={{opacity:0.5}} className="text-lg font-medium w-1/5 ">
                  {elem.firstName}
                </span>
              )}

              <h3 className="text-lg font-medium w-1/5 ">
                {elem.taskCounts.newTask}
              </h3>
              <h5 className="text-lg font-medium w-1/5 ">
                {elem.taskCounts.active}
              </h5>
              <h5 className="text-lg font-medium w-1/5 ">
                {elem.taskCounts.completed}
              </h5>
              <h5 className="text-lg font-medium w-1/5 ">
                {elem.taskCounts.failed}
              </h5>
            </CardComponent>
          );
        })}
      </div>
    </div>
  );
};

export default Alltask;
