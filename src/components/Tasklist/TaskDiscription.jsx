import React, { useContext } from "react";
import DOMPurify from "dompurify";
import { X } from "lucide-react"; // Import close icon
import { ThemeContext } from "../../context/ThemeContext";
import CardComponent from "../CardComponent";
import Primary from "../button/Primary";

const TaskDescription = ({ data, setState }) => {

const {theme} = useContext(ThemeContext)
  const discription = () => {
    setState(true);
    
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <CardComponent className={`relative w-full max-w-4xl  rounded-lg shadow-lg p-6 `}>
        
        {/* Close Button */}
        <button 
          className="absolute bottom-4 right-4 text-gray-600 hover:text-red-600 transition"
          // Closes the page
        >
          {data.taskDate}
        </button>

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
        <h3>
              <Primary className={`text-sm px-3 py-1 rounded`}>
                {data.category}
              </Primary>
            </h3>
          <h4  onClick={discription} className="text-sm text-red-600 h-8 w-6"> <X size={24} /></h4>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold">{data.taskTitle}</h2>

        {/* Description */}
        <div
          className="mt-4 p-4 rounded-lg min-h-64 max-h-[400px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.taskDescription) }}
        ></div>


      </CardComponent>
    </div>
  );
};

export default TaskDescription;
