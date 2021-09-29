import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FullScreenReview from "./fullscreenreview/fullscreenreview";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiFillStar, AiOutlineFileImage } from "react-icons/ai";

const TvFullScreenResult = () => {
    const { id } = useParams();
    const [tvData, setTvData] = useState({});
    const [tvResultData, setTvResultData] = useState({});
    const [tvCreditData, setTvCreditData] = useState({});
    const [toggle, setToggle] = useState(false);
    const {
        addToWatchList,
        removeFromWatchList,
        isTvShowInWatchlist,
        convertDate,
    } = useGlobalContext();

    const getTvData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTvData(data);
    };

    const getTvReview = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTvResultData(data);
    };

    const getMovieCredit = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/credits?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTvCreditData(data);
    };

    useEffect(() => {
        getTvData();
        getTvReview();
        getMovieCredit();
    }, []);

    const found = isTvShowInWatchlist(tvData.id);

    return (
        <div
            className="fullscreen"
            // style={{
            //     backgroundImage:
            //         "url(" +
            //         `http://image.tmdb.org/t/p/w500/${tvData.backdrop_path}` +
            //         ")",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
        >
            <div className="fullscreen-card">
                <img
                    className="fullscreen-img"
                    src={`https://image.tmdb.org/t/p/w500/${tvData.poster_path}`}
                    alt=""
                />
                <section className="fullscreen-section">
                    <section className="fullscreen-info">
                        <h1 className="fullscreen-title">{tvData.name}</h1>
                        <div className="fullscreen-list-info">
                            <p className="fullscreen-release-date">
                                {convertDate(tvData.release_date)}
                            </p>
                            <div className="ball"></div>
                            <div className="fullscreen-genre">
                                {tvData.genres !== undefined ? (
                                    tvData.genres.map((type) => {
                                        return <p key={type.id}>{type.name}</p>;
                                    })
                                ) : (
                                    <p></p>
                                )}
                            </div>
                            <div className="ball"></div>
                            <p>{tvData.runtime} mins</p>
                        </div>
                        <div className="fullscreen-rating">
                            <h4 className="average-score-title">
                                Average Score:
                            </h4>
                            <p className="fullscreen-vote">
                                <AiFillStar className="render-icon" />
                                {tvData.vote_average}
                            </p>
                            <button
                                className="add-remove-button"
                                onClick={() => {
                                    found
                                        ? removeFromWatchList("tv", tvData.id)
                                        : addToWatchList("tv", tvData);
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
                            {tvData.production_companies !== undefined ? (
                                tvData.production_companies.map((company) => {
                                    return (
                                        <p
                                            key={company.id}
                                            className="company-name"
                                        >
                                            {company.name}
                                        </p>
                                    );
                                })
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <h4 className="fullscreen-tagline">
                            <i>{tvData.tagline}</i>
                        </h4>
                        <div className="fullscreen-overview">
                            <h3>Overview</h3>
                            <p>{tvData.overview}</p>
                        </div>
                    </section>
                    <section className="review-cast-btn-container">
                        <div className="review-cast-toggle-button">
                            <button
                                id="cast-btn"
                                className="fullscreen-toggle-btn"
                                onClick={() => setToggle(false)}
                            >
                                Cast
                            </button>
                            <button
                                id="review-btn"
                                className="fullscreen-toggle-btn"
                                onClick={() => setToggle(true)}
                            >
                                Reviews
                            </button>
                        </div>
                    </section>
                    {toggle ? (
                        tvResultData.results !== undefined ? (
                            <div className="fullscreen-reviews">
                                {tvResultData.results.map((result, index) => {
                                    return (
                                        <FullScreenReview
                                            key={index}
                                            author={result.author}
                                            written={convertDate(
                                                result.created_at
                                            )}
                                            review={result.content}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div></div>
                        )
                    ) : tvCreditData.cast !== undefined ? (
                        <div className="fullscreen-cast">
                            {tvCreditData.cast.map((cast) => {
                                return (
                                    <div key={cast.id} className="cast-credit">
                                        <div className="cast-img-container">
                                            {cast.profile_path === null ? (
                                                <AiOutlineFileImage
                                                    className="cast-btn-icon"
                                                    aria-hidden={true}
                                                    focusable={false}
                                                />
                                            ) : (
                                                <img
                                                    className="cast-img"
                                                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                                    alt=""
                                                />
                                            )}
                                        </div>

                                        <Link
                                            to={`/result/people/${cast.id}`}
                                            className="cast-name"
                                        >
                                            {cast.character}
                                        </Link>
                                        <p className="cast-role">{cast.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default TvFullScreenResult;
