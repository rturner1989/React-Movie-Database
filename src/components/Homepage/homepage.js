import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import useFetch from "../../hooks/useFetch";
import ToggleButton from "../ToggleButton/toggleButton";
import RenderedCard from "./RenderedCard/renderedCard";
import Carousel from "../Carousel/Carousel";

const Homepage = () => {
    const {
        watchList,
        isMovieInWatchlist,
        isTvShowInWatchlist,
        toggleWatchlistCategory,
    } = useGlobalContext();

    const [popularMovieData, popularMovieLoading, popularMovieError] = useFetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
    );
    const [popularTVData, popularTVLoading, popularTVError] = useFetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
    );
    const [topRatedMovieData, topRatedMovieLoading, topRatedMovieError] =
        useFetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
    const [topRatedTVData, topRatedTVLoading, topRatedTVError] = useFetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
    );

    const [popularCategory, setPopularCategory] = useState("movie");
    const [topRatedCategory, setTopRatedCategory] = useState("movie");

    const popScrollRef = useHorizontalScroll(false);
    const topScrollRef = useHorizontalScroll(false);
    const watchScrollRef = useHorizontalScroll(false);

    const [windowDimensions] = useWindowDimensions();

    const togglePopularCategory = () => {
        setPopularCategory(popularCategory === "movie" ? "tv" : "movie");
    };

    const toggleTopRatedCategory = () => {
        setTopRatedCategory(topRatedCategory === "movie" ? "tv" : "movie");
    };

    const getMappedCards = (array, category) => {
        switch (category) {
            case "movie":
                return array.map((item) => {
                    return (
                        <RenderedCard
                            key={item.id}
                            id={item.id}
                            found={isMovieInWatchlist(item.id)}
                            imgSrc={item.poster_path}
                            linkTo={`/result/movie/${item.id}`}
                            title={item.title}
                            vote={item.vote_average}
                            removeCat={"movie"}
                            removeID={item.id}
                            addCat={"movie"}
                            addID={item}
                        />
                    );
                });
            case "tv":
                return array.map((item) => {
                    return (
                        <RenderedCard
                            key={item.id}
                            id={item.id}
                            found={isTvShowInWatchlist(item.id)}
                            imgSrc={item.poster_path}
                            linkTo={`/result/tv/${item.id}`}
                            title={item.name}
                            vote={item.vote_average}
                            removeCat={"tv"}
                            removeID={item.id}
                            addCat={"tv"}
                            addID={item}
                        />
                    );
                });
            default:
                throw new Error("category not found");
        }
    };

    if (windowDimensions.width <= 450) {
        return (
            <div id="homepage">
                <section id="popular" className="section">
                    <div className="section-title-container">
                        <h2 className="section-title">What's Popular</h2>
                    </div>
                    <ToggleButton
                        handleClick={togglePopularCategory}
                        active={popularCategory}
                    />
                    {popularMovieLoading || popularTVLoading ? (
                        <div className="card-loading">
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        <Carousel>
                            {getMappedCards(
                                popularCategory === "movie"
                                    ? popularMovieData.results
                                    : popularTVData.results,
                                popularCategory
                            )}
                        </Carousel>
                    )}
                </section>
                <section id="rated" className="section">
                    <div className="section-title-container">
                        <h2 className="section-title">Top Rated</h2>
                    </div>
                    <ToggleButton
                        handleClick={toggleTopRatedCategory}
                        active={topRatedCategory}
                    />
                    {topRatedMovieLoading || topRatedTVLoading ? (
                        <div className="card-loading">
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        <Carousel>
                            {getMappedCards(
                                topRatedCategory === "movie"
                                    ? topRatedMovieData.results
                                    : topRatedTVData.results,
                                topRatedCategory
                            )}
                        </Carousel>
                    )}
                </section>
                <section id="watchlist" className="section">
                    <div className="section-title-container">
                        <h2 className="section-title">Watchlist</h2>
                    </div>
                    <ToggleButton
                        handleClick={toggleWatchlistCategory}
                        active={watchList.category}
                    />
                    {(watchList.category === "movie" &&
                        !watchList.movie.length) ||
                    (watchList.category === "tv" && !watchList.tv.length) ? (
                        <div id="watchlist-empty">
                            <h2>Your Watchlist is Empty...</h2>
                        </div>
                    ) : (
                        <Carousel>
                            {getMappedCards(
                                watchList.category === "movie"
                                    ? watchList.movie
                                    : watchList.tv,
                                watchList.category
                            )}
                        </Carousel>
                    )}
                </section>
            </div>
        );
    }

    return (
        <div id="homepage">
            <section id="popular" className="section">
                <div className="section-title-container">
                    <h2 className="section-title">What's Popular</h2>
                </div>
                <ToggleButton
                    handleClick={togglePopularCategory}
                    active={popularCategory}
                />
                <div
                    id="popular-container"
                    className="homepage-render-container"
                    ref={popScrollRef}
                >
                    {popularMovieLoading || popularTVLoading ? (
                        <h2>Loading</h2>
                    ) : (
                        getMappedCards(
                            popularCategory === "movie"
                                ? popularMovieData.results
                                : popularTVData.results,
                            popularCategory
                        )
                    )}
                </div>
            </section>
            <section id="rated" className="section">
                <div className="section-title-container">
                    <h2 className="section-title">Top Rated</h2>
                </div>
                <ToggleButton
                    handleClick={toggleTopRatedCategory}
                    active={topRatedCategory}
                />
                <div
                    id="top-rated-container"
                    className="homepage-render-container"
                    ref={topScrollRef}
                >
                    {topRatedMovieLoading || topRatedTVLoading ? (
                        <h2>Loading</h2>
                    ) : (
                        getMappedCards(
                            topRatedCategory === "movie"
                                ? topRatedMovieData.results
                                : topRatedTVData.results,
                            topRatedCategory
                        )
                    )}
                </div>
            </section>
            <section id="watchlist" className="section">
                <div className="section-title-container">
                    <h2 className="section-title">Watchlist</h2>
                </div>
                <ToggleButton
                    handleClick={toggleWatchlistCategory}
                    active={watchList.category}
                />
                <div
                    id="watchlist-container"
                    className="homepage-render-container"
                    ref={watchScrollRef}
                >
                    {(watchList.category === "movie" &&
                        !watchList.movie.length) ||
                    (watchList.category === "tv" && !watchList.tv.length) ? (
                        <div id="watchlist-empty">
                            <h2>Your Watchlist is Empty...</h2>
                        </div>
                    ) : (
                        getMappedCards(
                            watchList.category === "movie"
                                ? watchList.movie
                                : watchList.tv,
                            watchList.category
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
