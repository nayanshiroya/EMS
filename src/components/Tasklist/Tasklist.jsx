import React, { useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const Tasklist = ({ data, setTaskData, selectedFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // Default order

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle sorting selection change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to highlight searched text
  const highlightText = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 text-black px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Filter tasks based on selected category
  const filteredTasks = data.tasks.filter((task) => {
    if (selectedFilter === "newTask" && !task.newTask) return false;
    if (selectedFilter === "active" && !task.active) return false;
    if (selectedFilter === "completed" && !task.completed) return false;
    if (selectedFilter === "failed" && !task.failed) return false;
    return (
      task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort tasks based on date
  const sortedTasks = [...filteredTasks];

  if (sortOrder === "new") {
    sortedTasks.sort((a, b) => new Date(b.taskDate) - new Date(a.taskDate)); // Newest First
  } else if (sortOrder === "old") {
    sortedTasks.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate)); // Oldest First
  }

  return (
    <>
      <div className="w-full flex mt-11 mb-[-40px] gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/2 p-2 border border-gray-300 rounded-md text-black"
        />

        {/* Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="default">Sort</option>
          <option value="new">Newest First</option>
          <option value="old">Oldest First</option>
        </select>
      </div>

      {/* Task List */}
      <div
        id="Tasklist"
        className="h-[65%] overflow-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 pt-14 mt-5"
      >
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task, index) => (
            <React.Fragment key={index}>
              {task.active && (
                <AcceptTask
                  data={{
                    ...task,
                    taskTitle: highlightText(task.taskTitle),
                    category: highlightText(task.category),
                  }}
                  setTaskData={setTaskData}
                />
              )}
              {task.newTask && (
                <NewTask
                  data={{
                    ...task,
                    taskTitle: highlightText(task.taskTitle),
                    category: highlightText(task.category),
                  }}
                  setTaskData={setTaskData}
                />
              )}
              {task.completed && (
                <CompleteTask
                  employeeId={data.id}
                  data={{
                    ...task,
                    taskTitle: highlightText(task.taskTitle),
                    category: highlightText(task.category),
                  }}
                  setTaskData={setTaskData}
                />
              )}
              {task.failed && (
                <FailedTask
                  employeeId={data.id}
                  data={{
                    ...task,
                    taskTitle: highlightText(task.taskTitle),
                    category: highlightText(task.category),
                  }}
                  setTaskData={setTaskData}
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <p className="text-white text-lg">
            No tasks found for this category
          </p>
        )}
      </div>
    </>
  );
};

export default Tasklist;
