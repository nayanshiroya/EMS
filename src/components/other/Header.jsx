import React from 'react'

const Header = ({changeuser,data,data11}) => {
  const logoutuser = () =>{
    // window.location.reload()
    changeuser('')
    localStorage.setItem('loggedinuser',"")
    data11('')
  
  }



  return (
    <div className="flex justify-between items-center w-full mb-8">
      <h1 className="text-2xl font-bold">{data?.firstName} 👋</h1>
      <button onClick={logoutuser} className="bg-blue-500 px-4 py-2 rounded">Log Out</button>
    </div>
  )
}

export default Header
