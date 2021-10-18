import React from "react";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { useGlobalContext } from "../../../context";

const WatchlistList = ({
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
}) => {
    const { addToWatchList, removeFromWatchList } = useGlobalContext();

    return (
        <div className="list-active">
            <Link to={linkTo} className="watchlist-list-img-link">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
                    alt=""
                    className="watchlist-list-img"
                />
            </Link>
            <div className="watchlist-list-info">
                <Link to={linkTo} className="watchlist-list-link">
                    <h3>{title}</h3>
                </Link>
                <div className="watchlist-list-overview-vote-container">
                    <p className="watchlist-list-vote">
                        <AiFillStar className="watchlist-list-icon" />
                        {vote}
                    </p>
                    <p className="watchlist-list-overview">{overview}</p>
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

export default WatchlistList;
