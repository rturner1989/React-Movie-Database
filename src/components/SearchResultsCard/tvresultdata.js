import React from "react";
import { AiOutlineFileImage } from "react-icons/ai";

const TvResultData = ({ tvshow }) => {
    return (
        <div id="tvshow-search-results">
            <div id="tvshow-image-container">
                {tvshow.poster_path === null ? (
                    <div className="search-img">
                        <AiOutlineFileImage
                            className="btn-icon"
                            aria-hidden={true}
                            focusable={false}
                        />
                    </div>
                ) : (
                    <img
                        id="tvshow-img"
                        className="search-img"
                        src={`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}
                        alt=""
                    />
                )}
            </div>
            <div className="search-info">
                <h3 id="tvshow-title">{tvshow.name}</h3>
                <p id="tvshow-air-date">{tvshow.first_air_date}</p>
                <p id="tvshow-overview" className="overview">
                    {tvshow.overview}
                </p>
            </div>
        </div>
    );
};

export default TvResultData;
