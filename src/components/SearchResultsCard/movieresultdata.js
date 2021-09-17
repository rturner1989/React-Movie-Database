import React from "react";
import { AiOutlineFileImage } from "react-icons/ai";

const MovieResultData = ({ movie }) => {
    const date = new Date(movie.release_date);
    const string = date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div id="movie-search-results" className="search-result-card">
            <div id="movie-image-container">
                {movie.poster_path === null ? (
                    <div className="search-img">
                        <AiOutlineFileImage
                            className="btn-icon"
                            aria-hidden={true}
                            focusable={false}
                        />
                    </div>
                ) : (
                    <img
                        id="movie-img"
                        className="search-img"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                )}
            </div>
            <div className="search-info">
                <h3 id="movie-title">{movie.title}</h3>
                <p id="movie-release-date">{string}</p>
                <p id="movie-overview" className="overview">
                    {movie.overview}
                </p>
            </div>
        </div>
    );
};

export default MovieResultData;
