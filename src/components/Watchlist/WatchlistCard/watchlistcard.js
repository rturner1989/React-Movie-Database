import React from "react";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { useGlobalContext } from "../../../context";

const WatchlistCard = ({
    found,
    imgSrc,
    linkTo,
    title,
    overview,
    vote,
    removeCat,
    removeID,
    addCat,
    addID,
    watchlistView,
}) => {
    const { addToWatchList, removeFromWatchList } = useGlobalContext();

    return (
        <div
            className={
                watchlistView === "card"
                    ? "card-active"
                    : watchlistView === "list"
                    ? "list-active"
                    : ""
            }
        >
            <img
                src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
                alt=""
                className={
                    watchlistView === "card"
                        ? "watchlist-card-img"
                        : watchlistView === "list"
                        ? "watchlist-list-img"
                        : ""
                }
            />
            <div
                className={
                    watchlistView === "card"
                        ? "watchlist-card-info"
                        : watchlistView === "list"
                        ? "watchlist-list-info"
                        : ""
                }
            >
                <Link
                    to={linkTo}
                    className={
                        watchlistView === "card"
                            ? "watchlist-card-link"
                            : watchlistView === "list"
                            ? "watchlist-list-link"
                            : ""
                    }
                >
                    <h3>{title}</h3>
                </Link>
                <div
                    className={
                        watchlistView === "card"
                            ? "watchlist-card-overview-vote-container"
                            : watchlistView === "list"
                            ? "watchlist-list-overview-vote-container"
                            : ""
                    }
                >
                    <p
                        className={
                            watchlistView === "card"
                                ? "watchlist-card-vote"
                                : watchlistView === "list"
                                ? "watchlist-list-vote"
                                : ""
                        }
                    >
                        <AiFillStar
                            className={
                                watchlistView === "card"
                                    ? "watchlist-card-icon"
                                    : watchlistView === "list"
                                    ? "watchlist-list-icon"
                                    : ""
                            }
                        />
                        {vote}
                    </p>
                    <p
                        className={
                            watchlistView === "card"
                                ? "watchlist-card-overview"
                                : watchlistView === "list"
                                ? "watchlist-list-overview"
                                : ""
                        }
                    >
                        {overview}
                    </p>
                </div>
            </div>
            <button
                className="remove-from-wishlist"
                onClick={() => {
                    found
                        ? removeFromWatchList(removeCat, removeID)
                        : addToWatchList(addCat, addID);
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
};

export default WatchlistCard;
