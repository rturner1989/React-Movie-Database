import React from "react";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchresults";

const Search = () => {
    return (
        <div id="search-container">
            <Searchbar />
            <SearchResults />
        </div>
    );
};

export default Search;
