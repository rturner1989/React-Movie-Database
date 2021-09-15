import React from "react";
import { useGlobalContext } from "../context";
import MovieResultData from "./movieresultdata";
import TvResultData from "./tvresultdata";
import PeopleResultData from "./peopleresultdata";

const SearchResults = () => {
    const { searchResults } = useGlobalContext();

    if (searchResults.length === 0) {
        return (
            <div>
                <div></div>
            </div>
        );
    } else {
        return (
            <div id="search-results-container">
                {searchResults.results.map((item, index) => {
                    switch (searchResults.category) {
                        case "movie":
                            return (
                                <MovieResultData
                                    key={item.id}
                                    index={index}
                                    movie={item}
                                />
                            );
                        case "tv":
                            return (
                                <TvResultData
                                    key={item.id}
                                    index={index}
                                    tvshow={item}
                                />
                            );
                        case "people":
                            return (
                                <PeopleResultData
                                    key={item.id}
                                    index={index}
                                    person={item}
                                />
                            );
                        default:
                            break;
                    }
                })}
            </div>
        );
    }
};

export default SearchResults;
