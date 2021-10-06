import React from "react";
import { useGlobalContext } from "../../context";
import WatchlistCard from "./WatchlistCard/watchlistcard";

const Watchlist = () => {
    const { watchList, isMovieInWatchlist, movieCount, tvCount } =
        useGlobalContext();

    return (
        <div id="watchlist-container">
            <div id="watchlist-header">
                <h2>Your Watchlist</h2>
                <p>movie count {movieCount}</p>
                <p>tv count {tvCount}</p>
            </div>
            <div id="watchlist">
                {watchList.movie.length !== 0 ? (
                    watchList.movie.map((item) => {
                        return (
                            <WatchlistCard
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
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
