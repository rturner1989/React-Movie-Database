import React, { useState, useRef, useLayoutEffect } from "react";
import { useGlobalContext } from "../../context";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import WatchlistCard from "./WatchlistCard/watchlistcard";
import WatchlistList from "./WatchlistCard/watchlistList";

const Watchlist = () => {
    const {
        watchList,
        isMovieInWatchlist,
        isTvShowInWatchlist,
        movieCount,
        tvCount,
    } = useGlobalContext();

    const [movieWatchlist, setMovieWatchlist] = useState(watchList.movie);
    const [tvWatchlist, setTvWatchlist] = useState(watchList.tv);
    const [valueSelect, setValueSelect] = useState({
        ascending: "",
        descending: "",
    });
    const [watchlistView, setWatchlistView] = useState("card");

    const sortingTypeRef = useRef();
    const sortingDirectionRef = useRef();

    const sortWatchlist = (a, b) => {
        const sortedMovieWatchlist = [...a];
        const sortedTvWatchlist = [...b];
        if (sortingTypeRef.current.value === "alphabetical") {
            setValueSelect({ ascending: "A-Z", descending: "Z-A" });
            sortedMovieWatchlist.sort(compareMovieName);
            sortedTvWatchlist.sort(compareTvName);
        }
        if (sortingTypeRef.current.value === "rating") {
            setValueSelect({ ascending: "Low-High", descending: "High-Low" });
            sortedMovieWatchlist.sort(compareRating);
            sortedTvWatchlist.sort(compareRating);
        }
        if (sortingTypeRef.current.value === "date-added") {
            setValueSelect({ ascending: "New-Old", descending: "Old-New" });
            sortedMovieWatchlist.sort(compareDate);
            sortedTvWatchlist.sort(compareDate);
        }
        if (sortingDirectionRef.current.value === "descending") {
            sortedMovieWatchlist.reverse();
            sortedTvWatchlist.reverse();
        }
        setMovieWatchlist(sortedMovieWatchlist);
        setTvWatchlist(sortedTvWatchlist);
    };
    const compareMovieName = (a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA > nameB) {
            return 1;
        }
        if (nameA < nameB) {
            return -1;
        }
        return 0;
    };
    const compareTvName = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) {
            return 1;
        }
        if (nameA < nameB) {
            return -1;
        }
        return 0;
    };
    const compareRating = (a, b) => {
        return a.vote_average - b.vote_average;
    };
    const compareDate = (a, b) => {
        return b.date_added - a.date_added;
    };

    useLayoutEffect(() => {
        sortWatchlist(watchList.movie, watchList.tv);
    }, [watchList]);

    return (
        <div id="fullscreen-watchlist-root-container">
            <div className="sorting-selection">
                <nav className="sorting-options-grid">
                    <div className="date-rating-alpha-sorting">
                        <select
                            name="type"
                            ref={sortingTypeRef}
                            onChange={() =>
                                sortWatchlist(watchList.movie, watchList.tv)
                            }
                            className="date-rating-alpha-selection"
                            id="date-rating-alpha"
                        >
                            <option value="alphabetical">Alphabetical</option>
                            <option value="date-added">Date Added</option>
                            <option value="rating">Rating</option>
                        </select>
                        <select
                            name="direction"
                            ref={sortingDirectionRef}
                            onChange={() =>
                                sortWatchlist(watchList.movie, watchList.tv)
                            }
                            className="date-rating-alpha-selection"
                            id="ascending-descending"
                        >
                            <option value="ascending">
                                {valueSelect.ascending}
                            </option>
                            <option value="descending">
                                {valueSelect.descending}
                            </option>
                        </select>
                    </div>
                    <div className="view-selection">
                        <p>View:</p>
                        <div className="view-btn-container">
                            <button
                                className="view-btn"
                                onClick={() => setWatchlistView("card")}
                            >
                                <HiViewGrid className="view-btn-icon" />
                            </button>
                            <button
                                className="view-btn"
                                onClick={() => setWatchlistView("list")}
                            >
                                <HiViewList className="view-btn-icon" />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="fullscreen-watchlist-flex-container">
                <div className="watchlist-title-container">
                    <h2 className="section-title">Your Watchlist</h2>
                </div>
                <div id="fullscreen-watchlist">
                    <section className="fullscreen-watchlist-container">
                        <div className="fullscreen-watchlist-head">
                            <h3>Movie Watchlist</h3>
                            <p>Total Added - {movieCount}</p>
                        </div>
                        <div className="fullscreen-watchlist-map">
                            {movieWatchlist.map((item) => {
                                if (watchlistView === "card") {
                                    return (
                                        <WatchlistCard
                                            key={item.id}
                                            id={item.id}
                                            found={isMovieInWatchlist(item.id)}
                                            imgSrc={item.poster_path}
                                            linkTo={`/result/movie/${item.id}`}
                                            title={item.title}
                                            overview={item.overview}
                                            vote={item.vote_average}
                                            removeCat={"movie"}
                                            removeID={item.id}
                                            addCat={"movie"}
                                            addID={item}
                                        />
                                    );
                                } else {
                                    return (
                                        <WatchlistList
                                            key={item.id}
                                            id={item.id}
                                            found={isMovieInWatchlist(item.id)}
                                            imgSrc={item.poster_path}
                                            linkTo={`/result/movie/${item.id}`}
                                            title={item.title}
                                            overview={item.overview}
                                            vote={item.vote_average}
                                            removeCat={"movie"}
                                            removeID={item.id}
                                            addCat={"movie"}
                                            addID={item}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </section>
                    <section className="fullscreen-watchlist-container">
                        <div className="fullscreen-watchlist-head">
                            <h3>TV Show Watchlist</h3>
                            <p>Total Added - {tvCount}</p>
                        </div>
                        <div className="fullscreen-watchlist-map">
                            {tvWatchlist.map((item) => {
                                if (watchlistView === "card") {
                                    return (
                                        <WatchlistCard
                                            key={item.id}
                                            id={item.id}
                                            found={isTvShowInWatchlist(item.id)}
                                            imgSrc={item.poster_path}
                                            linkTo={`/result/tv/${item.id}`}
                                            title={item.name}
                                            overview={item.overview}
                                            vote={item.vote_average}
                                            removeCat={"tv"}
                                            removeID={item.id}
                                            addCat={"tv"}
                                            addID={item}
                                        />
                                    );
                                } else {
                                    return (
                                        <WatchlistList
                                            key={item.id}
                                            id={item.id}
                                            found={isTvShowInWatchlist(item.id)}
                                            imgSrc={item.poster_path}
                                            linkTo={`/result/tv/${item.id}`}
                                            title={item.name}
                                            overview={item.overview}
                                            vote={item.vote_average}
                                            removeCat={"tv"}
                                            removeID={item.id}
                                            addCat={"tv"}
                                            addID={item}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
