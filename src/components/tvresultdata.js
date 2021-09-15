import React from "react";
import { AiOutlineFileImage } from "react-icons/ai";

const TvResultData = ({ tvshow }) => {
    return (
        <div id="tvshow-search-results" className="search-result-card">
            {tvshow.poster_path === null ? (
                <div>
                    <AiOutlineFileImage />
                </div>
            ) : (
                <img
                    id="tvshow-img"
                    className="search-img"
                    src={`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}
                    alt="tv show poster image"
                />
            )}
            <div className="search-info">
                <h3 id="tvshow-title">{tvshow.title}</h3>
                <p id="tvshow-air-date">{tvshow.first_air_date}</p>
                <p id="tvshow-overview" className="overview">
                    {tvshow.overview}
                </p>
            </div>
        </div>
    );
};

export default TvResultData;
