import React from "react";
import { useGlobalContext } from "../../context";
import WatchlistCard from "./WatchlistCard/watchlistcard";

const Watchlist = () => {
    const { watchList, isMovieInWatchlist } = useGlobalContext();

    return (
        <div>
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
    );
};

export default Watchlist;
