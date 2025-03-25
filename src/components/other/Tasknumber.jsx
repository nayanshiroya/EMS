import React, { useState } from "react";

const Tasknumber = ({ data, setSelectedFilter , boxColor, textColor}) => {
  // State to store colors for each box
  // const [boxColors, setBoxColors] = useState({
  //   newTask: "rgb(59, 130, 246)", // Default Blue
  //   completed: "rgb(34, 197, 94)", // Default Green
  //   active: "rgb(234, 179, 8)", // Default Yellow
  //   failed: "rgb(239, 68, 68)" // Default Red
  // });

  // Function to update color of a specific box
  // const handleColorChange = (key, color) => {
  //   setBoxColors((prevColors) => ({
  //     ...prevColors,
  //     [key]: color
  //   }));
  // };

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        {[
          { key: "newTask", label: "New Task", count: data.taskCounts.newTask },
          { key: "completed", label: "Completed", count: data.taskCounts.completed },
          { key: "active", label: "Accepted", count: data.taskCounts.active },
          { key: "failed", label: "Failed", count: data.taskCounts.failed }
        ].map(({ key, label, count }) => (
          <div
            key={key}
            className="relative w-1/4 p-5 rounded-lg cursor-pointer hover:opacity-90 transition "
           
            onClick={() => setSelectedFilter(key)}
            style={{ backgroundColor: boxColor }}
          >
            {/* Small Round Color Picker in Top-Right Corner */}
            {/* <input
              type="color"
              value={boxColors[key]}
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full border-none cursor-pointer"
            /> */}
            
            <h2 style={{
              color: textColor,
            }} className="text-3xl font-bold text-white">{count}</h2>
            <p style={{
              color: textColor,
            }} className="text-white">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasknumber;
