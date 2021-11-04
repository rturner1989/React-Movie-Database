import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { useGlobalContext } from "../../context";

const Navbar = () => {
    const { setSearchResults, setExpandBiography, setModalContent } =
        useGlobalContext();

    return (
        <nav id="navbar">
            <ul id="navbar-list">
                <li>
                    <Link
                        className="nav-link"
                        to="/"
                        onClick={() => {
                            setSearchResults({
                                category: "movie",
                                movie: [],
                                tv: [],
                                people: [],
                            });
                            setExpandBiography(false);
                            setModalContent("");
                        }}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className="nav-link"
                        to="/watchlist"
                        onClick={() => {
                            setExpandBiography(false);
                            setModalContent("");
                        }}
                    >
                        Watchlist
                    </Link>
                </li>
                <li>
                    <Link
                        className="nav-link search-icon-link"
                        to="/search"
                        onClick={() => {
                            setExpandBiography(false);
                            setModalContent("");
                        }}
                    >
                        <GoSearch className="link-icon" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
