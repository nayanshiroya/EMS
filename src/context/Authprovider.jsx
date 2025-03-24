import React, { createContext, useEffect, useState } from "react";
import { getlocalstorage } from "../utils/localstorage";

export const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // setlocalstorage()
    const { employee } = getlocalstorage();
    setUserData(employee || []);
}, []);             

  return (
    <div>
      <Authcontext.Provider value={[userData,setUserData]}>{children}</Authcontext.Provider>
    </div>
  );
};

export default Authprovider;
