import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";

const MovieFullScreenResult = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [movieReviewData, setMovieReviewData] = useState({});
    const [movieCreditData, setMovieCreditData] = useState({});
    const [toggle, setToggle] = useState(false);
    const {
        addToWatchList,
        removeFromWatchList,
        isMovieInWatchlist,
        convertDate,
    } = useGlobalContext();

    const getMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setMovieData(data);
    };

    const getMovieReview = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setMovieReviewData(data);
    };

    const getMovieCredit = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setMovieCreditData(data);
    };

    useEffect(() => {
        getMovieData();
        getMovieReview();
        getMovieCredit();
    }, []);

    const found = isMovieInWatchlist(movieData.id);

    return (
        <div
            className="fullscreen"
            // style={{
            //     backgroundImage:
            //         "url(" +
            //         `http://image.tmdb.org/t/p/w500/${movieData.backdrop_path}` +
            //         ")",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
        >
            <div className="fullscreen-card">
                <div className="fullscreen-img">
                    <img
                        src={`http://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                        alt=""
                    />
                </div>
                <div className="fullscreen-section">
                    <div className="fullscreen-info">
                        <h1 className="fullscreen-title">{movieData.title}</h1>
                        <div className="fullscreen-list-info">
                            <p>{convertDate(movieData.release_date)}</p>
                            <div className="ball"></div>
                            <div className="fullscreen-genre">
                                {movieData.genres !== undefined ? (
                                    movieData.genres.map((type) => {
                                        return <p key={type.id}>{type.name}</p>;
                                    })
                                ) : (
                                    <p></p>
                                )}
                            </div>
                            <div className="ball"></div>
                            <p>{movieData.runtime} mins</p>
                        </div>
                        <div className="fullscreen-rating">
                            <h4>Average Score:</h4>
                            <p className="fullscreen-vote">
                                <AiFillStar className="render-icon" />
                                {movieData.vote_average}
                            </p>
                            <button
                                className="add-remove-button"
                                onClick={() => {
                                    found
                                        ? removeFromWatchList(
                                              "movie",
                                              movieData.id
                                          )
                                        : addToWatchList("movie", movieData);
                                }}
                            >
                                {found ? (
                                    <IoMdRemoveCircleOutline
                                        className="remove-icon"
                                        aria-hidden={true}
                                        focusable={false}
                                    />
                                ) : (
                                    <IoMdAddCircleOutline
                                        className="add-icon"
                                        aria-hidden={true}
                                        focusable={false}
                                    />
                                )}
                            </button>
                        </div>
                        <div className="fullscreen-production">
                            {movieData.production_companies !== undefined ? (
                                movieData.production_companies.map(
                                    (company) => {
                                        return (
                                            <p
                                                key={company.id}
                                                className="company-name"
                                            >
                                                {company.name}
                                            </p>
                                        );
                                    }
                                )
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <h4 className="fullscreen-tagline">
                            <i>{movieData.tagline}</i>
                        </h4>
                        <div className="fullscreen-overview">
                            <h3>Overview</h3>
                            <p>{movieData.overview}</p>
                        </div>
                    </div>
                    <div id="review-cast-toggle-button">
                        <button onClick={() => setToggle(false)}>Cast</button>
                        <button onClick={() => setToggle(true)}>Reviews</button>
                    </div>
                    {toggle ? (
                        movieReviewData.results !== undefined ? (
                            <div className="fullscreen-reviews">
                                {movieReviewData.results.map((result) => {
                                    return (
                                        <div
                                            key={result.id}
                                            className="fullscreen-review"
                                        >
                                            <h4>A review by {result.author}</h4>
                                            <h5>
                                                <i>
                                                    Written by {result.author}{" "}
                                                    on{" "}
                                                    {convertDate(
                                                        result.created_at
                                                    )}
                                                </i>
                                            </h5>
                                            <p class="review-content">
                                                {result.content}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div></div>
                        )
                    ) : movieCreditData.cast !== undefined ? (
                        <div className="fullscreen-cast">
                            {movieCreditData.cast.map((cast) => {
                                return (
                                    <div key={cast.id} className="cast-credit">
                                        <img
                                            className="cast-img"
                                            src={`http://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                            alt=""
                                        />
                                        <p className="cast-role">
                                            {cast.character}
                                        </p>
                                        <Link
                                            to={`/result/people/${cast.id}`}
                                            className="cast-name"
                                        >
                                            {cast.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieFullScreenResult;
