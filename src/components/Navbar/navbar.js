import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { useGlobalContext } from "../../context";

const Navbar = () => {
    const { lastAdded, lastRemoved } = useGlobalContext();
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
                <div id="last-added" className="added-removed">
                    {lastAdded ? <p>Added to Watchlist</p> : <p></p>}
                </div>
                <div id="last-removed" className="added-removed">
                    {lastRemoved ? <p>Removed from Watchlist</p> : <p></p>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
