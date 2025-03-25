const Header = ({ changeuser, data, data11, setBoxColor, setTextColor, setBgColor }) => {
  const logoutuser = () => {
    changeuser("");
    localStorage.setItem("loggedinuser", "");
    data11("");
  };

  return (
    <div className="flex justify-between items-center w-full mb-8 relative">
      <h1 className="text-2xl font-bold">{data?.firstName} 👋</h1>
      
      {/* Color Pickers */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
        <input
          type="color"
          className="w-8 h-8 rounded-full border"
          onChange={(e) => setBoxColor(e.target.value)}
          title="Change Box Background"
        />
        <input
          type="color"
          className="w-8 h-8 rounded-full border"
          onChange={(e) => setTextColor(e.target.value)}
          title="Change Text Color"
        />
        <input
          type="color"
          className="w-8 h-8 rounded-full border"
          onChange={(e) => setBgColor(e.target.value)}
          title="Change Page Background"
        />
      </div>

      <button onClick={logoutuser} className="bg-blue-500 px-4 py-2 rounded">
        Log Out
      </button>
    </div>
  );
};

export default Header;
