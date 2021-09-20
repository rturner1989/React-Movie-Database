import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";
import { useGlobalContext } from "../../context";

const MovieResultData = ({ movie }) => {
    const { addToWatchList } = useGlobalContext();
    const date = new Date(movie.release_date);
    const string = date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div id="movie-search-results">
            <Link
                to={`/result/movie/${movie.id}`}
                id="movie-image-container"
                className="movie-link"
            >
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
                        alt=""
                    />
                )}
            </Link>
            <div className="search-info">
                <Link to={`/result/movie/${movie.id}`} className="movie-link">
                    <h3 id="movie-title">{movie.title}</h3>
                </Link>
                <p id="movie-release-date">{string}</p>
                <p id="movie-overview" className="overview">
                    {movie.overview}
                </p>
            </div>
            <div>
                <button onClick={() => addToWatchList("movie", movie)}>
                    add to watchlist
                </button>
            </div>
        </div>
    );
};

export default MovieResultData;
