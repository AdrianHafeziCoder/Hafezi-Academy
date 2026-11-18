import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Apply the saved theme (dark/light) before the page is shown
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Hafezi-Academy">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
