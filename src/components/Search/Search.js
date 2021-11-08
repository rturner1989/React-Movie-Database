import React, { useRef } from "react";
import { useGlobalContext } from "../../context";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchresults";

const Search = () => {
    const { setIsScroll } = useGlobalContext();
    const scrollRef = useRef();

    return (
        <div
            ref={scrollRef}
            id="search-container"
            onScroll={() => {
                if (scrollRef.current.scrollTop <= 0) {
                    setIsScroll(false);
                } else {
                    setIsScroll(true);
                }
            }}
        >
            <Searchbar />
            <SearchResults />
        </div>
    );
};

export default Search;
