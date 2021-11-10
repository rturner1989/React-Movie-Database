import React, { useRef } from "react";
import { useGlobalContext } from "../../context";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchresults";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Search = () => {
    const { setIsScroll, returnToTop } = useGlobalContext();
    const scrollRef = useRef();

    const [windowDimensions] = useWindowDimensions();

    return (
        <div
            ref={scrollRef}
            className={windowDimensions.width < 926 ? "mobile-scroll" : ""}
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
            {returnToTop(scrollRef)}
        </div>
    );
};

export default Search;
