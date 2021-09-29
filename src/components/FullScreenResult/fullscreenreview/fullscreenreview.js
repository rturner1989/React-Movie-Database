import React from "react";

const FullScreenReview = ({ author, written, review }) => {
    return (
        <div className="fullscreen-review">
            <h4>A review by {author}</h4>
            <h5>
                <i>
                    Written by {author} on {written}
                </i>
            </h5>
            <p className="review-content">{review}</p>
            {/* <button onClick={() => setExpand(!expand)}>
                {expand ? "retract" : "expand"}
            </button> */}
        </div>
    );
};

export default FullScreenReview;
