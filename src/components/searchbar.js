import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Searchbar = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const [category, setCategory] = useState("movie");

    const { search } = useGlobalContext();

    return (
        <form id="title-searchbar">
            <div className="title-bar">
                <label htmlFor="title-input" className="hidden-label">
                    Location Input
                </label>
                <input
                    id="title-input"
                    type="text"
                    value={searchTitle}
                    placeholder="Search for a title"
                    onChange={(e) => {
                        setSearchTitle(e.target.value);
                    }}
                />
                <label htmlFor="search-btn" className="hidden-label">
                    Search Button
                </label>
                <button
                    id="search-btn"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        search(category, searchTitle);
                        setSearchTitle("");
                    }}
                >
                    Search
                </button>
                <label
                    htmlFor="search-options-dropdown"
                    className="hidden-label"
                >
                    Search Options
                </label>
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                    id="search-options-dropdown"
                >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                    <option value="people">Person</option>
                </select>
            </div>
        </form>
    );
};

export default Searchbar;
