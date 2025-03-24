import React from "react";
import Header from "../other/header";
import Createtask from "../other/Createtask";
import Alltask from "../other/Alltask";
import EmployeeList from "../other/EmployeeList";

const AdminDashboard = ({ changeuser, data, data11 }) => {
  return (
    <div className="p-10">
      <Header changeuser={changeuser} data={data} data11={data11} />
      <EmployeeList />
      <Createtask />
      <Alltask />
    </div>
  );
};

export default AdminDashboard;
