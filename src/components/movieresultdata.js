import React from "react";
import { AiOutlineFileImage } from "react-icons/ai";

const MovieResultData = ({ movie }) => {
    return (
        <div id="movie-search-results" className="search-result-card">
            {movie.poster_path === null ? (
                <div>
                    <AiOutlineFileImage />
                </div>
            ) : (
                <img
                    id="movie-img"
                    className="search-img"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movie poster image"
                />
            )}
            <div className="search-info">
                <h3 id="movie-title">{movie.title}</h3>
                <p id="movie-release-date">{movie.release_date}</p>
                <p id="movie-overview" className="overview">
                    {movie.overview}
                </p>
            </div>
        </div>
    );
};

export default MovieResultData;
