import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
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
                        placeholder="Search for a Title"
                        onChange={(e) => {
                            setSearchTitle(e.target.value);
                        }}
                    />
                    <button
                        id="search-btn"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            search(category, searchTitle);
                            setSearchTitle("");
                        }}
                    >
                        <GoSearch className="search-btn-icon" />
                    </button>
                </div>
                <div className="category-btn-container">
                    <button
                        id="category-movie-btn"
                        className="category-btn"
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
                        className="category-btn"
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
                        className="category-btn"
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
                    onClick={() => {
                        setSearchResults({
                            category: "movie",
                            movie: [],
                            tv: [],
                            people: [],
                        });
                    }}
                >
                    clear
                </button>
            </div>
        </form>
    );
};

export default Searchbar;
