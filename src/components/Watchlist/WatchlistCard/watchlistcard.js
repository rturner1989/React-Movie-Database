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
    vote,
    removeCat,
    removeID,
    addCat,
    addID,
}) => {
    const { addToWatchList, removeFromWatchList } = useGlobalContext();

    return (
        <div className="watchlist-card">
            <img
                src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
                alt=""
                className="watchlist-img"
            />
            <Link to={linkTo} className="watchlist-card-link">
                <h3>{title}</h3>
            </Link>
            <p className="watchlist-vote">
                <AiFillStar className="watchlist-icon" />
                {vote}
            </p>
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
