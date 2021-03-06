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
}) => {
    const { addToWatchList, removeFromWatchList } = useGlobalContext();

    return (
        <div className="card-active">
            <img
                src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
                alt=""
                className="watchlist-card-img"
            />
            <div className="watchlist-card-info">
                <Link to={linkTo} className="watchlist-card-link">
                    <h3>{title}</h3>
                </Link>
                <div className="watchlist-card-overview-vote-container">
                    <p className="watchlist-card-vote">
                        <AiFillStar className="watchlist-card-icon" />
                        {vote}
                    </p>
                    <p className="watchlist-card-overview">{overview}</p>
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
