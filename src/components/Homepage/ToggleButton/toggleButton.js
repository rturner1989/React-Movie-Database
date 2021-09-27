import React from "react";

const ToggleButton = ({ function1, function2 }) => {
    return (
        <div className="toggle-button-group">
            <button className="toggle-btn movie-toggle" onClick={function1}>
                Movie
            </button>
            <button className="toggle-btn tv-toggle" onClick={function2}>
                TV
            </button>
        </div>
    );
};

export default ToggleButton;
