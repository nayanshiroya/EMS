import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Authprovider from "./context/Authprovider.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Authprovider>
      <ThemeProvider>
      <App />
  </ThemeProvider>
    </Authprovider>
  // {/* </StrictMode> */}
);
