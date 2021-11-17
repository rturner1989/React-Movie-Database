import React from "react";
import { useGlobalContext } from "../../../context";

const Addremovewatchlist = () => {
    const { watchListAlert } = useGlobalContext();
    return (
        <div
            id="watchlist-alert"
            className={
                watchListAlert.isAdded
                    ? "added"
                    : watchListAlert.isRemoved
                    ? "removed"
                    : ""
            }
        >
            {watchListAlert.isAdded ? (
                <p>Added to Watchlist - {watchListAlert.title}</p>
            ) : watchListAlert.isRemoved ? (
                <p>Removed from Watchlist - {watchListAlert.title}</p>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default Addremovewatchlist;
