import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

const TvFullScreenResult = () => {
    const { id } = useParams();
    const [tvData, setTvData] = useState({});
    const [tvResultData, setTvResultData] = useState({});

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

    useEffect(() => {
        getTvData();
        getTvReview();
    }, []);

    const found = isTvShowInWatchlist(tvData.id);

    return (
        <div className="fullscreen">
            <div className="fullscreen-card">
                <img
                    className="fullscreen-img"
                    src={`http://image.tmdb.org/t/p/w500/${tvData.poster_path}`}
                    alt=""
                />
                <div className="fullscreen-info">
                    <h1 className="fullscreen-title">{tvData.name}</h1>
                    <div className="fullscreen-list-info">
                        <p>{convertDate(tvData.first_air_date)}</p>
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
                        <h4>Average Score:</h4>
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
                </div>
                <div className="fullscreen-reviews">
                    {tvResultData.results !== undefined ? (
                        tvResultData.results.map((result) => {
                            return (
                                <div
                                    key={result.id}
                                    className="fullscreen-review"
                                >
                                    <h4>A review by {result.author}</h4>
                                    <h5>
                                        <i>
                                            Written by {result.author} on{" "}
                                            {convertDate(result.created_at)}
                                        </i>
                                    </h5>
                                    <p class="review-content">
                                        {result.content}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TvFullScreenResult;
