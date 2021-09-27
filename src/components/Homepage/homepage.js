import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import ToggleButton from "./ToggleButton/toggleButton";
import RenderedCard from "./RenderedCard/renderedCard";

const Homepage = () => {
    const { watchList, setWatchList, isMovieInWatchlist, isTvShowInWatchlist } =
        useGlobalContext();
    const [popularData, setPopularData] = useState({
        category: "",
        results: [],
    });
    const [topRatedData, setTopRatedData] = useState({
        category: "",
        results: [],
    });

    const getPopularMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPopularData({ category: "movie", results: data.results });
    };

    const getPopularTVData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setPopularData({ category: "tv", results: data.results });
    };

    const getTopRatedMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTopRatedData({ category: "movie", results: data.results });
    };

    const getTopRatedTVData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB`
        );
        const data = await response.json();
        setTopRatedData({ category: "tv", results: data.results });
    };

    useEffect(() => {
        getPopularMovieData();
        getTopRatedMovieData();
    }, []);

    return (
        <div id="homepage">
            <section id="popular" className="section">
                <h2>What's Popular</h2>
                <ToggleButton
                    function1={getPopularMovieData}
                    function2={getPopularTVData}
                />
                <div
                    id="popular-container"
                    className="homepage-render-container"
                >
                    {popularData.category === "movie" ? (
                        popularData.results.map((movie) => {
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
                        })
                    ) : popularData.category === "tv" ? (
                        popularData.results.map((tv) => {
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
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
            <section id="rated" className="section">
                <h2>Top Rated</h2>
                <ToggleButton
                    function1={getTopRatedMovieData}
                    function2={getTopRatedTVData}
                />
                <div
                    id="top-rated-container"
                    className="homepage-render-container"
                >
                    {topRatedData.category === "movie" ? (
                        topRatedData.results.map((movie) => {
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
                        })
                    ) : topRatedData.category === "tv" ? (
                        topRatedData.results.map((tv) => {
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
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
            <section id="watchlist" className="section">
                <h2>Watchlist</h2>
                <ToggleButton
                    function1={() =>
                        setWatchList({ ...watchList, category: "movie" })
                    }
                    function2={() =>
                        setWatchList({ ...watchList, category: "tv" })
                    }
                />
                <div
                    id="watchlist-container"
                    className="homepage-render-container"
                >
                    {(watchList.category === "movie" &&
                        !watchList.movie.length) ||
                    (watchList.category === "tv" && !watchList.tv.length) ? (
                        <div>
                            <h2>Hello World</h2>
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
