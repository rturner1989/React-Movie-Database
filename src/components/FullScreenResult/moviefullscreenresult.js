import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import {
    AiFillStar,
    AiOutlineFileImage,
    AiOutlineClose,
    AiOutlineExpandAlt,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import FullScreenReview from "./fullscreenreview/fullscreenreview";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const MovieFullScreenResult = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    const [movieReviewData, setMovieReviewData] = useState({});
    const [movieCreditData, setMovieCreditData] = useState({});
    const [toggle, setToggle] = useState({ category: "cast" });
    const [mobileToggle, setMobileToggle] = useState({ category: "overview" });
    const {
        addToWatchList,
        removeFromWatchList,
        isMovieInWatchlist,
        convertDate,
        expandBiography,
        setExpandBiography,
        modalContent,
        setModalContent,
    } = useGlobalContext();

    const [windowDimensions] = useWindowDimensions();
    const found = isMovieInWatchlist(movieData.id);

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

    const movieContentToggle = () => {
        switch (mobileToggle.category) {
            case "overview":
                return (
                    <div className="mobile-fullscreen-overview">
                        <div className="mobile-fullscreen-list-info">
                            <p className="mobile-fullscreen-release-date">
                                {convertDate(movieData.release_date)}
                            </p>
                            <div className="ball"></div>
                            <div className="mobile-fullscreen-genre">
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
                        <div className="mobile-fullscreen-rating">
                            <h4 className="mobile-average-score-title">
                                Average Score:
                            </h4>
                            <p className="mobile-fullscreen-vote">
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
                        <div className="mobile-fullscreen-production">
                            {movieData.production_companies !== undefined ? (
                                movieData.production_companies.map(
                                    (company) => {
                                        return (
                                            <p
                                                key={company.id}
                                                className="mobile-company-name"
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
                        <h4 className="mobile-fullscreen-tagline">
                            <i>{movieData.tagline}</i>
                        </h4>
                        <div className="mobile-fullscreen-overview-text">
                            <h3>Overview</h3>
                            <p className="mobile-fullscreen-overview-content">
                                {movieData.overview}
                            </p>
                            <button
                                className="mobile-expand-btn"
                                onClick={() => {
                                    setExpandBiography(!expandBiography);
                                    setModalContent(movieData.overview);
                                }}
                            >
                                <AiOutlineExpandAlt
                                    className="expand-icon"
                                    aria-hidden={true}
                                    focusable={false}
                                />
                            </button>
                        </div>
                    </div>
                );
            case "cast":
                return movieCreditData.cast !== undefined ? (
                    <div className="mobile-fullscreen-cast">
                        {movieCreditData.cast.map((cast) => {
                            return (
                                <div
                                    key={cast.id}
                                    className="mobile-cast-credit"
                                >
                                    {cast.profile_path === null ? (
                                        <div className="mobile-cast-btn-icon-container">
                                            <AiOutlineFileImage
                                                className="mobile-cast-btn-icon"
                                                aria-hidden={true}
                                                focusable={false}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            className="mobile-cast-img"
                                            src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                            alt=""
                                        />
                                    )}
                                    <Link
                                        to={`/result/people/${cast.id}`}
                                        className="mobile-cast-name"
                                    >
                                        {cast.character}
                                    </Link>
                                    <p className="mobile-cast-role">
                                        {cast.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div></div>
                );
            case "review":
                return movieReviewData.results !== undefined ? (
                    <div className="mobile-fullscreen-reviews">
                        {movieReviewData.results.map((result, index) => {
                            return (
                                <div key={index}>
                                    <FullScreenReview
                                        author={result.author}
                                        written={convertDate(result.created_at)}
                                        review={result.content}
                                    />
                                    <button
                                        className="review-modal-expand-btn"
                                        onClick={() => {
                                            setExpandBiography(
                                                !expandBiography
                                            );
                                            setModalContent(result.content);
                                        }}
                                    >
                                        <AiOutlineExpandAlt
                                            className="expand-icon"
                                            aria-hidden={true}
                                            focusable={false}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div></div>
                );
            default:
                break;
        }
    };

    if (windowDimensions.width <= 950) {
        return (
            <div className="mobile-fullscreen">
                <div className="mobile-fullscreen-card">
                    <img
                        className="mobile-fullscreen-img"
                        src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                        alt=""
                    />
                    <div className="mobile-fullscreen-section-container">
                        <h1 className="mobile-fullscreen-title">
                            {movieData.title}
                        </h1>
                        <nav className="mobile-fullscreen-header-container">
                            <ul className="mobile-fullscreen-header">
                                <li
                                    className={`mobile-toggle-btn mobile-overview-btn ${
                                        mobileToggle.category === "overview"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setMobileToggle({
                                            category: "overview",
                                        })
                                    }
                                    disabled={
                                        mobileToggle.category === "overview"
                                    }
                                >
                                    Overview
                                </li>
                                <li
                                    className={`mobile-toggle-btn mobile-cast-btn ${
                                        mobileToggle.category === "cast"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setMobileToggle({
                                            category: "cast",
                                        })
                                    }
                                    disabled={mobileToggle.category === "cast"}
                                >
                                    Cast
                                </li>
                                <li
                                    className={`mobile-toggle-btn mobile-review-btn ${
                                        mobileToggle.category === "review"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setMobileToggle({
                                            category: "review",
                                        })
                                    }
                                    disabled={
                                        mobileToggle.category === "review"
                                    }
                                >
                                    Review
                                </li>
                            </ul>
                        </nav>
                        {movieContentToggle()}
                    </div>
                    <div
                        className={
                            expandBiography
                                ? "modal-biography-active"
                                : "modal-biography-hidden"
                        }
                    >
                        <button
                            className="model-exit-btn"
                            onClick={() => setExpandBiography(false)}
                        >
                            <AiOutlineClose
                                className="model-btn-icon"
                                aria-hidden={true}
                                focusable={false}
                            />
                        </button>
                        <p className="modal-biography">{modalContent}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fullscreen">
            <div className="fullscreen-card">
                <img
                    className="fullscreen-img"
                    src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                    alt=""
                />
                <section className="fullscreen-section">
                    <section className="fullscreen-info">
                        <h1 className="fullscreen-title">{movieData.title}</h1>
                        <div className="fullscreen-list-info">
                            <p className="fullscreen-release-date">
                                {convertDate(movieData.release_date)}
                            </p>
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
                            <h4 className="average-score-title">
                                Average Score:
                            </h4>
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
                            <p className="fullscreen-overview-content">
                                {movieData.overview}
                            </p>
                            <button
                                className="expand-btn"
                                onClick={() => {
                                    setExpandBiography(!expandBiography);
                                    setModalContent(movieData.overview);
                                }}
                            >
                                <AiOutlineExpandAlt
                                    className="expand-icon"
                                    aria-hidden={true}
                                    focusable={false}
                                />
                            </button>
                        </div>
                    </section>
                    <section className="review-cast-btn-container">
                        <div className="review-cast-toggle-button">
                            <button
                                id="cast-btn"
                                className={`fullscreen-toggle-btn cast-btn ${
                                    toggle.category === "cast"
                                        ? "review-cast-active"
                                        : ""
                                }`}
                                onClick={() => setToggle({ category: "cast" })}
                            >
                                Cast
                            </button>
                            <button
                                id="review-btn"
                                className={`fullscreen-toggle-btn review-btn ${
                                    toggle.category === "review"
                                        ? "review-cast-active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setToggle({ category: "review" })
                                }
                            >
                                Reviews
                            </button>
                        </div>
                    </section>
                    {toggle.category === "review" ? (
                        movieReviewData.results !== undefined ? (
                            <div className="fullscreen-reviews">
                                {movieReviewData.results.map(
                                    (result, index) => {
                                        return (
                                            <div key={index}>
                                                <FullScreenReview
                                                    author={result.author}
                                                    written={convertDate(
                                                        result.created_at
                                                    )}
                                                    review={result.content}
                                                />
                                                <button
                                                    className="review-modal-expand-btn"
                                                    onClick={() => {
                                                        setExpandBiography(
                                                            !expandBiography
                                                        );
                                                        setModalContent(
                                                            result.content
                                                        );
                                                    }}
                                                >
                                                    <AiOutlineExpandAlt
                                                        className="expand-icon"
                                                        aria-hidden={true}
                                                        focusable={false}
                                                    />
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        ) : (
                            <div></div>
                        )
                    ) : toggle.category === "cast" ? (
                        movieCreditData.cast !== undefined ? (
                            <div className="fullscreen-cast">
                                {movieCreditData.cast.map((cast) => {
                                    return (
                                        <div
                                            key={cast.id}
                                            className="cast-credit"
                                        >
                                            {cast.profile_path === null ? (
                                                <div className="cast-btn-icon-container">
                                                    <AiOutlineFileImage
                                                        className="cast-btn-icon"
                                                        aria-hidden={true}
                                                        focusable={false}
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    className="cast-img"
                                                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                                    alt=""
                                                />
                                            )}

                                            <Link
                                                to={`/result/people/${cast.id}`}
                                                className="cast-name"
                                            >
                                                {cast.character}
                                            </Link>
                                            <p className="cast-role">
                                                {cast.name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div></div>
                        )
                    ) : (
                        <div></div>
                    )}
                </section>
            </div>
            <div
                className={
                    expandBiography
                        ? "modal-biography-active"
                        : "modal-biography-hidden"
                }
            >
                <button
                    className="model-exit-btn"
                    onClick={() => setExpandBiography(false)}
                >
                    <AiOutlineClose
                        className="model-btn-icon"
                        aria-hidden={true}
                        focusable={false}
                    />
                </button>
                <p className="modal-biography">{modalContent}</p>
            </div>
        </div>
    );
};

export default MovieFullScreenResult;
