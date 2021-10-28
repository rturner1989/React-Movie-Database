import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
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
    const [popularData, setPopularData] = useState({
        category: "movie",
        movie: [],
        tv: [],
    });
    const [topRatedData, setTopRatedData] = useState({
        category: "movie",
        movie: [],
        tv: [],
    });

    const popScrollRef = useHorizontalScroll(false);
    const topScrollRef = useHorizontalScroll(false);
    const watchScrollRef = useHorizontalScroll(false);

    const [windowDimensions] = useWindowDimensions();

    const getPopularMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPopularData((prev) => {
            return { ...prev, movie: data.results };
        });
    };

    const getPopularTVData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPopularData((prev) => {
            return { ...prev, tv: data.results };
        });
    };

    const getTopRatedMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTopRatedData((prev) => {
            return { ...prev, movie: data.results };
        });
    };

    const getTopRatedTVData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTopRatedData((prev) => {
            return { ...prev, tv: data.results };
        });
    };

    const togglePopularCategory = () => {
        setPopularData({
            ...popularData,
            category: popularData.category === "movie" ? "tv" : "movie",
        });
    };

    const toggleTopRatedCategory = () => {
        setTopRatedData({
            ...topRatedData,
            category: topRatedData.category === "movie" ? "tv" : "movie",
        });
    };

    useEffect(() => {
        getPopularMovieData();
        getPopularTVData();
        getTopRatedMovieData();
        getTopRatedTVData();
    }, []);

    const getPopularArray = () => {
        switch (popularData.category) {
            case "movie":
                return popularData.movie.map((movie) => {
                    return (
                        <RenderedCard
                            key={movie.id}
                            id={movie.id}
                            found={isMovieInWatchlist(movie.id)}
                            imgSrc={movie.poster_path}
                            linkTo={`/result/movie/${movie.id}`}
                            title={movie.title}
                            vote={movie.vote_average}
                            removeCat={"movie"}
                            removeID={movie.id}
                            addCat={"movie"}
                            addID={movie}
                        />
                    );
                });
            case "tv":
                popularData.tv.map((tv) => {
                    return (
                        <RenderedCard
                            key={tv.id}
                            id={tv.id}
                            found={isTvShowInWatchlist(tv.id)}
                            imgSrc={tv.poster_path}
                            linkTo={`/result/tv/${tv.id}`}
                            title={tv.name}
                            vote={tv.vote_average}
                            removeCat={"tv"}
                            removeID={tv.id}
                            addCat={"tv"}
                            addID={tv}
                        />
                    );
                });
            default:
                break;
        }
    };
    const getTopRatedArray = () => {
        switch (topRatedData.category) {
            case "movie":
                return topRatedData.movie.map((movie) => {
                    return (
                        <RenderedCard
                            key={movie.id}
                            id={movie.id}
                            found={isMovieInWatchlist(movie.id)}
                            imgSrc={movie.poster_path}
                            linkTo={`/result/movie/${movie.id}`}
                            title={movie.title}
                            vote={movie.vote_average}
                            removeCat={"movie"}
                            removeID={movie.id}
                            addCat={"movie"}
                            addID={movie}
                        />
                    );
                });
            case "tv":
                topRatedData.tv.map((tv) => {
                    return (
                        <RenderedCard
                            key={tv.id}
                            id={tv.id}
                            found={isTvShowInWatchlist(tv.id)}
                            imgSrc={tv.poster_path}
                            linkTo={`/result/tv/${tv.id}`}
                            title={tv.name}
                            vote={tv.vote_average}
                            removeCat={"tv"}
                            removeID={tv.id}
                            addCat={"tv"}
                            addID={tv}
                        />
                    );
                });
            default:
                break;
        }
    };

    if (windowDimensions.width <= 900) {
        return (
            <div id="homepage">
                <section id="popular" className="section">
                    <div className="section-title-container">
                        <h2 className="section-title">What's Popular</h2>
                    </div>
                    <ToggleButton
                        handleClick={togglePopularCategory}
                        active={popularData.category}
                    />
                    <Carousel>{getPopularArray()}</Carousel>
                </section>
                <section id="rated" className="section">
                    <div className="section-title-container">
                        <h2 className="section-title">Top Rated</h2>
                    </div>
                    <ToggleButton
                        handleClick={toggleTopRatedCategory}
                        active={topRatedData.category}
                    />
                    <Carousel>{getTopRatedArray()}</Carousel>
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
                    active={popularData.category}
                />
                <div
                    id="popular-container"
                    className="homepage-render-container"
                    ref={popScrollRef}
                >
                    {getPopularArray()}
                </div>
            </section>
            <section id="rated" className="section">
                <div className="section-title-container">
                    <h2 className="section-title">Top Rated</h2>
                </div>
                <ToggleButton
                    handleClick={toggleTopRatedCategory}
                    active={topRatedData.category}
                />
                <div
                    id="top-rated-container"
                    className="homepage-render-container"
                    ref={topScrollRef}
                >
                    {getTopRatedArray()}
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
                    ) : watchList.category === "movie" ? (
                        watchList.movie.map((item) => {
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
                        })
                    ) : watchList.category === "tv" ? (
                        watchList.tv.map((item) => {
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
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
