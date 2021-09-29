import React from "react";

const ToggleButton = ({ handleClick, active }) => {
    return (
        <div className="toggle-button-group">
            <button
                className={`toggle-btn movie-toggle ${
                    active === "movie" ? "active" : ""
                }`}
                onClick={handleClick}
                disabled={active === "movie"}
            >
                Movie
            </button>
            <button
                className={`toggle-btn tv-toggle ${
                    active === "tv" ? "active" : ""
                }`}
                onClick={handleClick}
                disabled={active === "tv"}
            >
                TV
            </button>
        </div>
    );
};

export default ToggleButton;
