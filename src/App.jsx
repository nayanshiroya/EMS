import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboeard from "./components/Dashboard/EmployeeDashboeard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { Authcontext } from "./context/Authprovider";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

const App = () => {
  const [user, setuser] = useState(null);

  const [loggedinuserdata, setloggedinuserdata] = useState(null);

  const [userData] = useContext(Authcontext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedinuser");

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setuser(userData.role);
      setloggedinuserdata(userData.data);
    }
  }, []);

  useEffect(() => {
    // Listen for changes in localStorage and update state
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("loggedinuser"));
      if (updatedUser) {
        setuser(updatedUser.role);
        setloggedinuserdata(updatedUser.data || null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handlelogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      setuser("admin");
      localStorage.setItem("loggedinuser", JSON.stringify({ role: "admin" }));
      return; // Exit function after successful admin login
    }

    if (userData) {
      const employee = userData.find(
        (e) => email === e.email && e.password === password
      );

      if (employee) {
        setuser("employee");
        setloggedinuserdata(employee);
        localStorage.setItem(
          "loggedinuser",
          JSON.stringify({ role: "employee", data: employee })
        );
      } else {
        alert("Invalid Credentials"); // Show alert if no matching employee found
      }
    } else {
      alert("Invalid Credentials"); // Show alert if userData is null/undefined
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={
              !user ? (
                <Login handlelogin={handlelogin} />
              ) : (
                <Navigate to={user === "admin" ? "/admin" :  `/employee/${loggedinuserdata?.id}`} />
              )
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin"
            element={
              user === "admin" ? (
                <AdminDashboard
                  changeuser={setuser}
                  data={loggedinuserdata}
                  data11={setloggedinuserdata}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Employee Dashboard Route */}
          <Route
            path="/employee/:id"
            element={
              user === "employee" ? (
                <EmployeeDashboeard
                  changeuser={setuser}
                  data={loggedinuserdata}
                  data11={setloggedinuserdata}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
