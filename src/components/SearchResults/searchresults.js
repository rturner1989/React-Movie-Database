import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import MovieResultData from "../SearchResultsCard/movieresultdata";
import TvResultData from "../SearchResultsCard/tvresultdata";
import PeopleResultData from "../SearchResultsCard/peopleresultdata";

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
                                <Link
                                    to={`/result/movie/${item.id}`}
                                    key={item.id}
                                    className="search-result-card"
                                >
                                    <MovieResultData
                                        index={index}
                                        movie={item}
                                    />
                                </Link>
                            );
                        case "tv":
                            return (
                                <Link
                                    to={`/result/tv/${item.id}`}
                                    key={item.id}
                                    className="search-result-card"
                                >
                                    <TvResultData index={index} tvshow={item} />
                                </Link>
                            );
                        case "people":
                            return (
                                <Link
                                    to={`/result/people/${item.id}`}
                                    key={item.id}
                                    className="person-result-card"
                                >
                                    <PeopleResultData
                                        index={index}
                                        person={item}
                                    />
                                </Link>
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
