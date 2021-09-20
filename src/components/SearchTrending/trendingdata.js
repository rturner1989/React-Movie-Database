import React from "react";
import { Link } from "react-router-dom";

const TrendingData = ({ title, img, id, link }) => {
    return (
        <div className="trending-tile">
            <img
                src={`https://image.tmdb.org/t/p/w500/${img}`}
                alt=""
                className="trending-img"
            />
            <Link to={`/result/${link}/${id}`} className="trending-link">
                <h3 className="trending-title">{title}</h3>
            </Link>
        </div>
    );
};

export default TrendingData;
