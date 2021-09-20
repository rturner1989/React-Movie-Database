import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";

const MovieFullScreenResult = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const { addToWatchList, removeFromWatchList, isMovieInWatchlist } =
        useGlobalContext();

    const date = new Date(movieData.release_date);
    const string = date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const getMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setMovieData(data);
    };

    useEffect(() => {
        getMovieData();
    }, []);

    const found = isMovieInWatchlist(movieData.id);

    return (
        <div className="fullscreen">
            <div id="movie-fullscreen-card">
                <div id="movie-fullscreen-img">
                    <img
                        src={`http://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                        alt=""
                    />
                </div>
                <div id="movie-fullscreen-info">
                    <h1>{movieData.title}</h1>
                    <h3>{movieData.tagline}</h3>
                    <p>{movieData.overview}</p>
                    {movieData.genres !== undefined ? (
                        movieData.genres.map((type) => {
                            return (
                                <div key={type.id} className="genre-name">
                                    <h3>{type.name}</h3>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                    {movieData.production_companies !== undefined ? (
                        movieData.production_companies.map((company) => {
                            return (
                                <div key={company.id} className="company-name">
                                    <p>{company.name}</p>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                    <div>
                        <h4>Release Date:</h4>
                        <p>{string}</p>
                    </div>
                    <div>
                        <h4>Running Time:</h4>
                        <p>{movieData.runtime} mins</p>
                    </div>
                    <div>
                        <h4>Average Rating:</h4>
                        <p>{movieData.vote_average}/10</p>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                found
                                    ? removeFromWatchList("movie", movieData.id)
                                    : addToWatchList("movie", movieData);
                            }}
                        >
                            {found
                                ? "Remove From Watchlist"
                                : "Add To Watchlist"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieFullScreenResult;
