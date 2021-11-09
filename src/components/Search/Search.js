import React, { useRef } from "react";
import { useGlobalContext } from "../../context";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchresults";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { BiUpArrow } from "react-icons/bi";

const Search = () => {
    const { setIsScroll, isScroll } = useGlobalContext();
    const scrollRef = useRef();

    const [windowDimensions] = useWindowDimensions();

    const returnToTop = () => {
        if (windowDimensions.width <= 950) {
            if (isScroll) {
                return (
                    <button className="return-to-top">
                        <BiUpArrow className="up-icon" />
                    </button>
                );
            }
            return;
        }
    };

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
            {returnToTop()}
        </div>
    );
};

export default Search;
