import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { useGlobalContext } from "../../context";

const Homepage = () => {
    const {
        watchList,
        setWatchList,
        addToWatchList,
        removeFromWatchList,
        isMovieInWatchlist,
        isTvShowInWatchlist,
    } = useGlobalContext();
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
        <div>
            <section className="section">
                <h2>What's Popular</h2>
                <div className="toggle-button-group">
                    <button
                        className="toggle-btn movie-toggle"
                        onClick={getPopularMovieData}
                    >
                        Movie
                    </button>
                    <button
                        className="toggle-btn tv-toggle"
                        onClick={getPopularTVData}
                    >
                        TV
                    </button>
                </div>

                <div id="popular-container">
                    {popularData.category === "movie" ? (
                        popularData.results.map((movie) => {
                            const found = isMovieInWatchlist(movie.id);
                            return (
                                <div className="popular-card" key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt=""
                                        className="popular-img"
                                    />
                                    <Link
                                        to={`/result/movie/${movie.id}`}
                                        className="popular-card-link"
                                    >
                                        <h3>{movie.title}</h3>
                                    </Link>
                                    <p className="popular-vote">
                                        {movie.vote_average}/10
                                    </p>
                                    <label
                                        className="hidden-label"
                                        htmlFor="remove2"
                                    >
                                        Remove/Add Watchlist
                                    </label>
                                    <button
                                        id="remove2"
                                        className="remove-from-wishlist"
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
                            );
                        })
                    ) : popularData.category === "tv" ? (
                        popularData.results.map((tv) => {
                            const found = isTvShowInWatchlist(tv.id);
                            return (
                                <div className="popular-card" key={tv.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                                        alt=""
                                        className="popular-img"
                                    />
                                    <Link
                                        to={`/result/tv/${tv.id}`}
                                        className="popular-card-link"
                                    >
                                        <h3>{tv.name}</h3>
                                    </Link>
                                    <p className="popular-vote">
                                        {tv.vote_average}/10
                                    </p>
                                    <label
                                        className="hidden-label"
                                        htmlFor="remove3"
                                    >
                                        Remove/Add Watchlist
                                    </label>
                                    <button
                                        id="remove3"
                                        className="remove-from-wishlist"
                                        onClick={() => {
                                            found
                                                ? removeFromWatchList(
                                                      "tv",
                                                      tv.id
                                                  )
                                                : addToWatchList("tv", tv);
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
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
            <section className="section">
                <h2>Top Rated</h2>
                <div className="toggle-button-group">
                    <button
                        className="toggle-btn movie-toggle"
                        onClick={getTopRatedMovieData}
                    >
                        Movie
                    </button>
                    <button
                        className="toggle-btn tv-toggle"
                        onClick={getTopRatedTVData}
                    >
                        TV
                    </button>
                </div>
                <div id="top-rated-container">
                    {topRatedData.category === "movie" ? (
                        topRatedData.results.map((movie) => {
                            const found = isMovieInWatchlist(movie.id);
                            return (
                                <div className="top-rated-card" key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt=""
                                        className="top-rated-img"
                                    />
                                    <Link
                                        to={`/result/movie/${movie.id}`}
                                        className="top-rated-card-link"
                                    >
                                        <h3>{movie.title}</h3>
                                    </Link>
                                    <p className="top-rated-vote">
                                        {movie.vote_average}/10
                                    </p>
                                    <label
                                        className="hidden-label"
                                        htmlFor="remove4"
                                    >
                                        Remove/Add Watchlist
                                    </label>
                                    <button
                                        id="remove4"
                                        className="remove-from-wishlist"
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
                            );
                        })
                    ) : topRatedData.category === "tv" ? (
                        topRatedData.results.map((tv) => {
                            const found = isTvShowInWatchlist(tv.id);
                            return (
                                <div className="top-rated-card" key={tv.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                                        alt=""
                                        className="top-rated-img"
                                    />
                                    <Link
                                        to={`/result/tv/${tv.id}`}
                                        className="top-rated-card-link"
                                    >
                                        <h3>{tv.name}</h3>
                                    </Link>
                                    <p className="top-rated-vote">
                                        {tv.vote_average}/10
                                    </p>
                                    <label
                                        className="hidden-label"
                                        htmlFor="remove5"
                                    >
                                        Remove/Add Watchlist
                                    </label>
                                    <button
                                        id="remove5"
                                        className="remove-from-wishlist"
                                        onClick={() => {
                                            found
                                                ? removeFromWatchList(
                                                      "tv",
                                                      tv.id
                                                  )
                                                : addToWatchList("tv", tv);
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
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </section>
            <section className="watchlist" className="section">
                <h2>Watchlist</h2>
                <div className="toggle-button-group">
                    <button
                        className="toggle-btn movie-toggle"
                        onClick={() =>
                            setWatchList({ ...watchList, category: "movie" })
                        }
                    >
                        Movie
                    </button>
                    <button
                        className="toggle-btn tv-toggle"
                        onClick={() =>
                            setWatchList({ ...watchList, category: "tv" })
                        }
                    >
                        TV
                    </button>
                </div>
                <div id="watchlist-container">
                    {watchList.category === "movie" ? (
                        watchList.movie.map((item) => {
                            const found = isMovieInWatchlist(item.id);
                            return (
                                <div className="watchlist-card" key={item.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt=""
                                        className="watchlist-img"
                                    />
                                    <Link
                                        to={`/result/movie/${item.id}`}
                                        className="wishlist-card-link"
                                    >
                                        <h3 className="watchlist-title">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="watchlist-vote">
                                        {item.vote_average}/10
                                    </p>
                                    <label
                                        className="hidden-label"
                                        htmlFor="remove-from-wishlist"
                                    >
                                        Remove/Add Watchlist
                                    </label>
                                    <button
                                        id="remove-from-wishlist"
                                        className="remove-from-wishlist"
                                        onClick={() => {
                                            if (found) {
                                                removeFromWatchList(
                                                    "movie",
                                                    item.id
                                                );
                                            }
                                        }}
                                    >
                                        <IoMdRemoveCircleOutline
                                            className="remove-icon"
                                            aria-hidden={true}
                                            focusable={false}
                                        />
                                    </button>
                                </div>
                            );
                        })
                    ) : watchList.category === "tv" ? (
                        watchList.tv.map((item) => {
                            const found = isTvShowInWatchlist(item.id);
                            return (
                                <div className="watchlist-card" key={item.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt=""
                                        className="watchlist-img"
                                    />
                                    <Link
                                        to={`/result/tv/${item.id}`}
                                        className="wishlist-card-link"
                                    >
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p className="watchlist-vote">
                                        {item.vote_average}/10
                                    </p>
                                    <label
                                        className="hidden-label"
                                        htmlFor="remove1"
                                    >
                                        Remove/Add Watchlist
                                    </label>
                                    <button
                                        id="remove1"
                                        className="remove-from-wishlist"
                                        onClick={() => {
                                            if (found) {
                                                removeFromWatchList(
                                                    "tv",
                                                    item.id
                                                );
                                            }
                                        }}
                                    >
                                        <IoMdRemoveCircleOutline
                                            className="remove-icon"
                                            aria-hidden={true}
                                            focusable={false}
                                        />
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
