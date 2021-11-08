import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { useGlobalContext } from "../../context";

const Navbar = () => {
    const { setSearchResults, setExpandBiography, setModalContent, isScroll } =
        useGlobalContext();

    const [isHover, setIsHover] = useState(false);
    const toggleHover = () => setIsHover(!isHover);

    return (
        <nav
            className={isScroll ? "navbar hidden-navbar" : "navbar"}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            <ul id="navbar-list">
                <li>
                    <Link
                        // className="nav-link"
                        className={
                            isScroll ? "nav-link hidden-link" : "nav-link"
                        }
                        id={isHover ? "visible-link" : ""}
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
                        // className="nav-link"
                        className={
                            isScroll ? "nav-link hidden-link" : "nav-link"
                        }
                        id={isHover ? "visible-link" : ""}
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
                        // className="nav-link search-icon-link"
                        className={
                            isScroll
                                ? "nav-link search-icon-link hidden-link"
                                : "nav-link search-icon-link"
                        }
                        id={isHover ? "visible-link" : ""}
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
