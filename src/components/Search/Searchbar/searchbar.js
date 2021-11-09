import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import { GoSearch } from "react-icons/go";

const Searchbar = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const [category, setCategory] = useState("movie");

    const {
        search,
        trendingData,
        setTrendingData,
        setSearchResults,
        searchResults,
    } = useGlobalContext();

    const placeHolderSearchText = () => {
        switch (category) {
            case "movie":
                return "Search for a Movie";
            case "tv":
                return "Search for a TV Show";
            case "people":
                return "Search for a Person";
            default:
                break;
        }
    };

    useEffect(() => {
        setTrendingData({ ...trendingData, type: category });
    }, [category]);

    return (
        <form id="title-searchbar">
            <div className="title-bar">
                <div className="search-input-container">
                    <input
                        id="title-input"
                        type="text"
                        value={searchTitle}
                        placeholder={placeHolderSearchText()}
                        onChange={(e) => {
                            setSearchTitle(e.target.value);
                        }}
                    />
                    <button
                        id="search-btn"
                        type="submit"
                        onClick={(e) => {
                            if (searchTitle === "") {
                                switch (category) {
                                    case "movie":
                                        return alert(
                                            "Please Enter Movie Title"
                                        );
                                    case "tv":
                                        return alert(
                                            "Please Enter TV Show Title"
                                        );
                                    case "people":
                                        return alert(
                                            "Please Enter Person Name"
                                        );
                                    default:
                                        break;
                                }
                            } else {
                                e.preventDefault();
                                search(category, searchTitle);
                                setSearchTitle("");
                            }
                        }}
                    >
                        <GoSearch className="search-btn-icon" />
                    </button>
                </div>
                <div className="category-btn-container">
                    <button
                        id="category-movie-btn"
                        className={`category-btn category-movie-btn ${
                            category === "movie" ? "category-active" : ""
                        }`}
                        onClick={() => {
                            setCategory("movie");
                            setSearchResults({
                                ...searchResults,
                                category: "movie",
                            });
                        }}
                    >
                        Movie
                    </button>
                    <button
                        id="category-tv-btn"
                        className={`category-btn category-tv-btn ${
                            category === "tv" ? "category-active" : ""
                        }`}
                        onClick={() => {
                            setCategory("tv");
                            setSearchResults({
                                ...searchResults,
                                category: "tv",
                            });
                        }}
                    >
                        TV
                    </button>
                    <button
                        id="category-people-btn"
                        className={`category-btn category-people-btn ${
                            category === "people" ? "category-active" : ""
                        }`}
                        onClick={() => {
                            setCategory("people");
                            setSearchResults({
                                ...searchResults,
                                category: "people",
                            });
                        }}
                    >
                        Person
                    </button>
                </div>
                <button
                    id="clear-search-btn"
                    onClick={() => {
                        setSearchResults({
                            category: "movie",
                            movie: [],
                            tv: [],
                            people: [],
                            query: {},
                        });
                    }}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default Searchbar;
