import React from "react";
import "./loading_screen.css";

const LoadingScreen = ({ isDarkMode, isLoading }) => {
  const themeClass = isDarkMode ? "dark-mode" : "light-mode";
  const visibilityClass = isLoading ? "visible" : "hidden";

  return (
    <div className={`loading-screen ${themeClass} ${visibilityClass}`}>
      <div className="logo-container">
        <div className="logo">
          <span className="logo-text">S</span>
        </div>
      </div>

      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
