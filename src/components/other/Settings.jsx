import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { stringify } from "postcss";

const Settings = ({ closeSettings }) => {
  const [showForm, setShowForm] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    {
      name: "Light Mode",
      bgColor: "#FFFFFF", // bg-white
      textColor: "#000000", // text-black
      cardColor: "#F3F4F6", // bg-gray-100
      buttonStyles: {
        primary: {
          bg: "#A855F7", // bg-purple-500
          text: "#FFFFFF", // text-white
          hover: "#9333EA", // hover:bg-purple-600
        },
        success: {
          bg: "#10B981", // bg-green-500
          text: "#FFFFFF", // text-white
          hover: "#059669", // hover:bg-green-600
        },
        warning: {
          bg: "#EF4444", // bg-red-500
          text: "#FFFFFF", // text-white
          hover: "#DC2626", // hover:bg-red-600
        },
        sortInput: {
          bg: "#E0E7FF", // bg-indigo-200
          text: "#1E3A8A", // text-indigo-900
          hover: "#C3DAFE", // hover:bg-indigo-300
        },
      },
    },
    {
      name: "Dark Mode",
      bgColor: "#111827", // bg-gray-900
      textColor: "#FFFFFF", // text-white
      cardColor: "#1F2937", // bg-gray-800
      buttonStyles: {
        primary: {
          bg: "#A855F7", // bg-purple-500
          text: "#FFFFFF", // text-white
          hover: "#9333EA", // hover:bg-purple-600
        },
        success: {
          bg: "#10B981", // bg-green-500
          text: "#FFFFFF", // text-white
          hover: "#059669", // hover:bg-green-600
        },
        warning: {
          bg: "#EF4444", // bg-red-500
          text: "#FFFFFF", // text-white
          hover: "#DC2626", // hover:bg-red-600
        },
        sortInput: {
          bg: "#E0E7FF", // bg-indigo-200
          text: "#1E3A8A", // text-indigo-900
          hover: "#C3DAFE", // hover:bg-indigo-300
        },
      },
    },
    {
      name: "Warm Mode",
      bgColor: "#FEF3C7", // bg-yellow-100
      textColor: "#C2410C", // text-orange-700
      cardColor: "#FED7AA", // bg-orange-200
      buttonStyles: {
        primary: {
          bg: "#A855F7", // bg-purple-500
          text: "#FFFFFF", // text-white
          hover: "#9333EA", // hover:bg-purple-600
        },
        success: {
          bg: "#10B981", // bg-green-500
          text: "#FFFFFF", // text-white
          hover: "#059669", // hover:bg-green-600
        },
        warning: {
          bg: "#EF4444", // bg-red-500
          text: "#FFFFFF", // text-white
          hover: "#DC2626", // hover:bg-red-600
        },
        sortInput: {
          bg: "#E0E7FF", // bg-indigo-200
          text: "#1E3A8A", // text-indigo-900
          hover: "#C3DAFE", // hover:bg-indigo-300
        },
      },
    },
    {
      name: "Cool Mode",
      bgColor: "#E0E7FF", // bg-indigo-100
      textColor: "#4338CA", // text-indigo-700
      cardColor: "#BFDBFE", // bg-blue-200
      buttonStyles: {
        primary: {
          bg: "#A855F7", // bg-purple-500
          text: "#FFFFFF", // text-white
          hover: "#9333EA", // hover:bg-purple-600
        },
        success: {
          bg: "#10B981", // bg-green-500
          text: "#FFFFFF", // text-white
          hover: "#059669", // hover:bg-green-600
        },
        warning: {
          bg: "#EF4444", // bg-red-500
          text: "#FFFFFF", // text-white
          hover: "#DC2626", // hover:bg-red-600
        },
        sortInput: {
          bg: "#E0E7FF", // bg-indigo-200
          text: "#1E3A8A", // text-indigo-900
          hover: "#C3DAFE", // hover:bg-indigo-300
        },
      },
    },
  ];
  const [color, setcolor] = useState("");
  const [color1, setcolor1] = useState("");
  const [color2, setcolor2] = useState("");

  //   console.log(color, color1, color2);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(color, color1, color2);
    setShowForm(false);

    setTheme((prevTheme) => ({
      ...prevTheme,
      bgColor: color ? color : prevTheme.bgColor,
      textColor: color1 ? color1 : prevTheme.textColor,
      cardColor: color2 ? color2 : prevTheme.cardColor,
    }));
    localStorage.setItem("theme",JSON.stringify(theme))

  };
  
  

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg w-96 fixed top-16 right-4 z-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Theme Settings 🎨
      </h2>

      {/* Theme Selection Circles */}
      <div className="flex justify-center gap-3 mb-6">
        {themes.map((t, index) => (
          <div
            key={index}
            onClick={() => {setTheme(t)
              localStorage.setItem("theme",JSON.stringify(theme))

              
            }}
            className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300  hover:scale-110`}
            style={{background: t.cardColor}}
            
          />
          
        ))}
      </div>

      {/* Customize Theme Button */}
      {!showForm ? (
        <button
          onClick={(e) => setShowForm(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Customize Theme ✏️
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Background Color</span>
            <input
              type="color"
              name="bgColor"
              value={color}
              onChange={(e) => setcolor(e.target.value)}
              className="w-[80%] m-auto h-8 border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Text Color</span>
            <input
              type="color"
              name="textColor"
              value={color1}
              onChange={(e) => setcolor1(e.target.value)}
              className="w-[80%] m-auto h-8 border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Card Color</span>
            <input
              type="color"
              name="cardColor"
              value={color2}
              onChange={(e) => setcolor2(e.target.value)}
              className="w-[80%] m-auto h-8 border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <div className="flex justify-between gap-3">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Apply
            </button>
            <button
              onClick={() => setShowForm(false)}
              type="button"
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Close Button */}
      <button
        onClick={closeSettings}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
      >
        Close
      </button>
    </div>
  );
};

export default Settings;
