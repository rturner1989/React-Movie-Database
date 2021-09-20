import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const Homepage = () => {
    const { watchList, setWatchList, addToWatchList, removeFromWatchList } =
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
            `https://api.themoviedb.org/3/movie/popular?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&page=1`
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

    const isMovieInWatchlist = (id) => {
        return watchList.movie.find((item) => item.id === id);
    };
    const isTvShowInWatchlist = (id) => {
        return watchList.tv.find((item) => item.id === id);
    };

    return (
        <div>
            <section id="watchlist" className="section">
                <h2>Watchlist</h2>
                <div>
                    <button
                        onClick={() =>
                            setWatchList({ ...watchList, category: "movie" })
                        }
                    >
                        movies
                    </button>
                    <button
                        onClick={() =>
                            setWatchList({ ...watchList, category: "tv" })
                        }
                    >
                        tv
                    </button>
                </div>
                <div id="watchlist-container">
                    {watchList.category === "movie" ? (
                        watchList.movie.map((item) => {
                            return (
                                <div className="watchlist-card" key={item.id}>
                                    <Link
                                        to={`/result/movie/${item.id}`}
                                        className="wishlist-card-link"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            alt=""
                                            className="watchlist-img"
                                        />
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <p className="watchlist-vote">
                                        {item.vote_average}/10
                                    </p>
                                </div>
                            );
                        })
                    ) : watchList.category === "tv" ? (
                        watchList.tv.map((item) => {
                            return (
                                <div className="watchlist-card" key={item.id}>
                                    <Link
                                        to={`/result/tv/${item.id}`}
                                        className="wishlist-card-link"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            alt=""
                                            className="watchlist-img"
                                        />
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p className="watchlist-vote">
                                        {item.vote_average}/10
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
            <section className="section">
                <h2>Popular on TMDB</h2>
                <span>
                    <button onClick={getPopularMovieData}>movies</button>
                    <button onClick={getPopularTVData}>tv</button>
                </span>
                <div id="popular-container">
                    {popularData.category === "movie" ? (
                        popularData.results.map((movie) => {
                            const found = isMovieInWatchlist(movie.id);
                            return (
                                <div className="popular-card" key={movie.id}>
                                    <Link
                                        to={`/result/movie/${movie.id}`}
                                        className="popular-card-link"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt=""
                                            className="popular-img"
                                        />
                                        <h3>{movie.title}</h3>
                                    </Link>
                                    <p className="popular-vote">
                                        {movie.vote_average}/10
                                    </p>
                                    <button
                                        onClick={() => {
                                            found
                                                ? removeFromWatchList(
                                                      "movie",
                                                      movie.id
                                                  )
                                                : addToWatchList(
                                                      "movie",
                                                      movie
                                                  );
                                        }}
                                    >
                                        {found
                                            ? "Remove From Watchlist"
                                            : "Add To Watchlist"}
                                    </button>
                                </div>
                            );
                        })
                    ) : popularData.category === "tv" ? (
                        popularData.results.map((tv) => {
                            const found = isTvShowInWatchlist(tv.id);
                            return (
                                <div className="popular-card" key={tv.id}>
                                    <Link
                                        to={`/result/tv/${tv.id}`}
                                        className="popular-card-link"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                                            alt=""
                                            className="popular-img"
                                        />
                                        <h3>{tv.name}</h3>
                                    </Link>
                                    <p className="popular-vote">
                                        {tv.vote_average}/10
                                    </p>
                                    <button
                                        onClick={() => {
                                            found
                                                ? removeFromWatchList(
                                                      "tv",
                                                      tv.id
                                                  )
                                                : addToWatchList("tv", tv);
                                        }}
                                    >
                                        {found
                                            ? "Remove From Watchlist"
                                            : "Add To Watchlist"}
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
            <section className="section">
                <h2>Top Rated</h2>
                <div>
                    <button onClick={getTopRatedMovieData}>movies</button>
                    <button onClick={getTopRatedTVData}>tv</button>
                </div>
                <div id="top-rated-container">
                    {topRatedData.category === "movie" ? (
                        topRatedData.results.map((movie) => {
                            const found = isMovieInWatchlist(movie.id);
                            return (
                                <div className="top-rated-card" key={movie.id}>
                                    <Link
                                        to={`/result/movie/${movie.id}`}
                                        className="top-rated-card-link"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt=""
                                            className="top-rated-img"
                                        />
                                        <h3>{movie.title}</h3>
                                    </Link>
                                    <p className="top-rated-vote">
                                        {movie.vote_average}/10
                                    </p>
                                    <button
                                        onClick={() => {
                                            found
                                                ? removeFromWatchList(
                                                      "movie",
                                                      movie.id
                                                  )
                                                : addToWatchList(
                                                      "movie",
                                                      movie
                                                  );
                                        }}
                                    >
                                        {found
                                            ? "Remove From Watchlist"
                                            : "Add To Watchlist"}
                                    </button>
                                </div>
                            );
                        })
                    ) : topRatedData.category === "tv" ? (
                        topRatedData.results.map((tv) => {
                            const found = isTvShowInWatchlist(tv.id);
                            return (
                                <div className="top-rated-card" key={tv.id}>
                                    <Link
                                        to={`/result/tv/${tv.id}`}
                                        className="top-rated-card-link"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                                            alt=""
                                            className="top-rated-img"
                                        />
                                        <h3>{tv.name}</h3>
                                    </Link>
                                    <p className="top-rated-vote">
                                        {tv.vote_average}/10
                                    </p>
                                    <button
                                        onClick={() => {
                                            found
                                                ? removeFromWatchList(
                                                      "tv",
                                                      tv.id
                                                  )
                                                : addToWatchList("tv", tv);
                                        }}
                                    >
                                        {found
                                            ? "Remove From Watchlist"
                                            : "Add To Watchlist"}
                                    </button>
                                </div>
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
