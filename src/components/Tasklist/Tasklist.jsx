import React, { useContext, useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { ThemeContext } from "../../context/ThemeContext";


const Tasklist = ({ data, setTaskData, selectedFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // Default order

  const {theme} = useContext(ThemeContext)

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

  // const [showForm, setShowForm] = useState(false);
  // const [theme, setTheme] = useState({
  //   boxBg: "bg-gray-200",
  //   mainBg: "bg-white",
  //   buttonColor: "bg-blue-500",
  //   dangerButton: "bg-red-500",
  //   textColor: "text-black",
  // });

  // const handleThemeChange = (e) => {
  //   const { name, value } = e.target;
  //   setTheme((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <>
      <div className="w-full flex flex-wrap mt-11 mb-[-40px] gap-4 items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`w-1/2 p-2 border border-gray-300 rounded-md text-black shadow-md ${theme.cardColor} ${theme.textColor} `}
        />

        {/* Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className={`p-2 border border-gray-300 rounded-md text-black shadow-md   ${theme.cardColor} ${theme.textColor}   `} 
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
          <p className={`${theme.textColor} text-lg`}>No tasks found for this category</p>
        )}
      </div>
    </>
  );
};

export default Tasklist;
