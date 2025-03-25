import React, { useEffect, useState } from "react";
import Header from "../other/Header";
import Tasknumber from "../other/Tasknumber";
import Tasklist from "../Tasklist/Tasklist";
import { getlocalstorage } from "../../utils/localstorage";

const EmployeeDashboard = (props) => {
  const [taskData, setTaskData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [boxColor, setBoxColor] = useState("#3b82f6"); // Default Blue
  const [textColor, setTextColor] = useState("#ffffff"); // Default White
  const [bgColor, setBgColor] = useState("#1c1c1c"); // Default Dark Background

  useEffect(() => {
    const { employee } = getlocalstorage();
    const currentEmployee = employee.find((emp) => emp.id === props.data.id);
    if (currentEmployee) {
      setTaskData(currentEmployee);
    }
  }, [props.data.id]);

  if (!taskData) return <p>Loading...</p>;
  return (
    <div style={{background:bgColor}} className="p-10 bg-[#1c1c1c] h-screen">
      <Header
        changeuser={props.changeuser}
        data={taskData}
        data11={props.data11}
        setBoxColor={setBoxColor}
  setTextColor={setTextColor}
  setBgColor={setBgColor}
      />
      <Tasknumber data={taskData} setSelectedFilter={setSelectedFilter}  boxColor={boxColor}
  textColor={textColor} />
      <Tasklist
        data={taskData}
        setTaskData={setTaskData}
        selectedFilter={selectedFilter}
        boxColor={boxColor}
        textColor={textColor}
      />
    </div>
  );
};

export default EmployeeDashboard;
