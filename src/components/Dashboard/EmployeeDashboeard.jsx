import React, { useEffect, useState } from "react";
import Header from "../other/header";
import Tasknumber from "../other/Tasknumber";
import Tasklist from "../Tasklist/Tasklist";
import { getlocalstorage } from "../../utils/localstorage";

const EmployeeDashboard = (props) => {
  
    const [taskData, setTaskData] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all"); 

    useEffect(() => {
      const { employee } = getlocalstorage();
      const currentEmployee = employee.find((emp) => emp.id === props.data.id);
      if (currentEmployee) {
        setTaskData(currentEmployee);
      }
    }, [props.data.id]); 
  
    if (!taskData) return <p>Loading...</p>;
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
      <Header
        changeuser={props.changeuser}
        data={taskData}
        data11={props.data11}
      />
      <Tasknumber data={taskData} setSelectedFilter={setSelectedFilter}/>
      <Tasklist data={taskData} setTaskData={setTaskData} selectedFilter={selectedFilter}/>
    </div>
  );
};

export default EmployeeDashboard;
