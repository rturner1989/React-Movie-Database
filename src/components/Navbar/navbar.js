import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
    return (
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
    );
};

export default Navbar;
