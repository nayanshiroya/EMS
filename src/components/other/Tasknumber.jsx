import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import CardComponent from "../CardComponent";

const Tasknumber = ({ data, setSelectedFilter }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <CardComponent className={`w-1/4`}>
          <div
            // className={`${theme.cardColor} ${theme.textColor} shadow-md border w-1/4 p-5 rounded-lg cursor-pointer `}
            onClick={() => setSelectedFilter("newTask")}
          >
            <h2 className="text-3xl font-bold">{data.taskCounts.newTask}</h2>
            <p>New Task</p>
          </div>
        </CardComponent>

        <CardComponent className={`w-1/4`}>
          <div
            // className={`${theme.cardColor} ${theme.textColor} shadow-md border w-1/4 p-5 rounded-lg cursor-pointer `}
            onClick={() => setSelectedFilter("completed")}
          >
            <h2 className="text-3xl font-bold">{data.taskCounts.completed}</h2>
            <p>Completed</p>
          </div>
        </CardComponent>

        <CardComponent className={`w-1/4`}>
          <div
            // className={`${theme.cardColor} ${theme.textColor} shadow-md border w-1/4 p-5 rounded-lg cursor-pointer `}
            onClick={() => setSelectedFilter("active")}
          >
            <h2 className="text-3xl font-bold">{data.taskCounts.active}</h2>
            <p>Accepted</p>
          </div>
        </CardComponent>


        <CardComponent className={`w-1/4`}>
          <div
            // className={`${theme.cardColor} ${theme.textColor} shadow-md border w-1/4 p-5 rounded-lg cursor-pointer `}
            onClick={() => setSelectedFilter("failed")}
          >
            <h2 className="text-3xl font-bold">{data.taskCounts.failed}</h2>
            <p>Failed</p>
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

export default Tasknumber;
