import React, { useContext, useRef, useState } from "react";
import { Authcontext } from "../../context/Authprovider";
import JoditEditor from "jodit-react";

const Createtask = () => {
  //////////////////////

  const editor = useRef(null);
  const config = {
    placeholder: "Start typing...",
    minHeight: 238,
    height: "auto",
    readonly: false,
    spellcheck: true,
    toolbarSticky: false,
    defaultActionOnPaste: "insert_clear_html",
  
    style: {
      color: "black", // ✅ Ensures typed text is black
      backgroundColor: "white", // ✅ Ensures background is white
    },
  
    iframeStyle: "body { color: black !important; background: white !important; }", // ✅ Enforces styles in editor
  };
  
  
  

  //////////////////////

  const [userData, setUserData] = useContext(Authcontext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [asignTo, setAsignTo] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };
    


    const storedData = JSON.parse(localStorage.getItem("employee")) || userData;

    // Find and update the assigned employee's tasks
    const updatedData = storedData.map((elem) => {
      if (asignTo === elem.firstName) {
        return {
          ...elem,
          tasks: elem.tasks ? [newTask, ...elem.tasks] : [newTask], // Append task
          taskCounts: {
            ...elem.taskCounts,
            newTask: elem.taskCounts.newTask + 1,
          },
          lastUpdated: Date.now(),
        };
      }
      return elem;
    });

    // Store the updated employees data back in localStorage
    localStorage.setItem("employee", JSON.stringify(updatedData));
    console.log(updatedData);


    setUserData(updatedData);

    setTaskTitle("");
    setCategory("");
    setAsignTo("");
    setTaskDate("");
    setTaskDescription("");
  };

  return (
    <div className="flex justify-center h-full bg-black p-4">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full flex gap-6"
      >
        {/* Left Side */}
        <div className="w-1/4">
          <label className="block mb-2">Task Title</label>
          <input
            required
            type="text"
            name="title"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            placeholder="Make a UI design"
            className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-700"
          />

          <label className="block mb-2">Date</label>
          <input
            required
            type="date"
            name="date"
            value={taskDate}
            onChange={(e) => {
              setTaskDate(e.target.value);
            }}
            className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-700"
            style={{
              colorScheme: "dark", // Ensures the text and calendar icon are styled properly
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7z'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 10px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "20px",
            }}
          />

          <label className="block mb-2">Assign To</label>
          <select
            required
            value={asignTo}
            onChange={(e) => setAsignTo(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-700"
          >
            <option value="" disabled>
              Select Employee
            </option>
            {userData.map((employee) => (
              <option
                className=""
                key={employee.email}
                value={employee.firstName}
              >
                {employee.firstName}
              </option>
            ))}
          </select>

          <label className="block mb-2">Category</label>
          <input
            required
            type="text"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="Design, Dev, etc."
            className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-700"
          />
        </div>

        {/* Right Side */}
        <div className="w-3/4 flex flex-col">
          <label className="block mb-2">Description</label>
          {/* <textarea
          required
            name="description"
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            className="w-full p-2 h-full bg-gray-800 rounded border border-gray-700"
          ></textarea> */}
          <JoditEditor
            className="w-full p-2 min-h-[253px] text-black bg-gray-800 rounded border border-gray-700"
            ref={editor}
            value={taskDescription}
            config={config}
            onBlur={(newContent) => setTaskDescription(newContent)}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full mb-4 pt-3 bg-green-600 hover:bg-blue-500 p-2 rounded font-bold mt-4"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createtask;
