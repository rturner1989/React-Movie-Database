import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { useGlobalContext } from "../../context";

const Navbar = () => {
    const { watchListAlert } = useGlobalContext();
    return (
        <div>
            <nav id="navbar">
                <ul id="navbar-list">
                    <li>
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/watchlist">
                            Watchlist
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/search">
                            <GoSearch className="link-icon" />
                        </Link>
                    </li>
                </ul>
            </nav>
            <div id="display">
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
            </div>
        </div>
    );
};

export default Navbar;
