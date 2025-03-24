import { useState } from "react";
import React from "react";

const Login = ({ handlelogin }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submithandler = (e) => {
    e.preventDefault();
    setemail("");
    setpassword("");
    handlelogin(email, password);
    console.log(email, password);

  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-emerald-200 p-10">
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            required
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="border-2 border-emerald-600 rounded-full text-xl px-5 py-3 m-4 outline-none bg-transparent placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email id"
          />
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="border-2 border-emerald-600 rounded-full text-xl px-5 py-3 mb-4 outline-none bg-transparent placeholder:text-gray-400"
            type="password"
            placeholder="Enter Password"
          />
          <button className="border-none rounded-full text-xl px-7 py-2 outline-none bg-emerald-700 text-white">
            Log in
          </button>
        </form>
        
      </div>
      <div className="my-6">admin: <span className="bg-emerald-700 mr-3">   admin@me.com</span > password: <span className="bg-emerald-700 ">123</span></div>
        <div>employee: <span className="bg-emerald-700 mr-3">    employeeName@e.com </span> password:<span className="bg-emerald-700 ">123</span></div>
    </div>
  );
};

export default Login;
