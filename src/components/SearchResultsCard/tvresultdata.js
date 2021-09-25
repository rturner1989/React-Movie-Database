import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";
import { useGlobalContext } from "../../context";

const TvResultData = ({ tvshow }) => {
    const {
        addToWatchList,
        removeFromWatchList,
        isTvShowInWatchlist,
        convertDate,
    } = useGlobalContext();

    const found = isTvShowInWatchlist(tvshow.id);
    return (
        <div id="tvshow-search-results">
            <Link
                to={`/result/tv/${tvshow.id}`}
                id="tvshow-image-container"
                className="tv-link"
            >
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
            </Link>
            <div className="search-info">
                <Link to={`/result/tv/${tvshow.id}`} className="tv-link">
                    <h3 id="tvshow-title">{tvshow.name}</h3>
                </Link>
                <p id="tvshow-air-date">{convertDate(tvshow.first_air_date)}</p>
                <p id="tvshow-overview" className="overview">
                    {tvshow.overview}
                </p>
            </div>
            <div>
                <button
                    onClick={() => {
                        found
                            ? removeFromWatchList("tv", tvshow.id)
                            : addToWatchList("tv", tvshow);
                    }}
                >
                    {found ? "Remove From Watchlist" : "Add To Watchlist"}
                </button>
            </div>
        </div>
    );
};

export default TvResultData;
