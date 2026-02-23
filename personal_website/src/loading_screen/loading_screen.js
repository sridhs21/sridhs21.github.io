import React from "react";
import "./loading_screen.css";

const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`ls ${isLoading ? "ls--visible" : "ls--hidden"}`}>
      <div className="ls__brand">ss</div>
      <div className="ls__dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default LoadingScreen;
