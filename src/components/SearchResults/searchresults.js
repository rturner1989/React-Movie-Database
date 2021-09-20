import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import MovieResultData from "../SearchResultsCard/movieresultdata";
import TvResultData from "../SearchResultsCard/tvresultdata";
import PeopleResultData from "../SearchResultsCard/peopleresultdata";

const SearchResults = () => {
    const [trendingData, setTrendingData] = useState({
        type: "movie",
        movie: [],
        tv: [],
        person: [],
    });
    const { searchResults, category, setCategory } = useGlobalContext();

    const getTrendingMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        console.log(data);
        setTrendingData({ type: "movie", movie: data.results });
    };
    const getTrendingTVData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/tv/day?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        // console.log(data);

        setTrendingData({ type: "tv", tv: data.results });
    };
    const getTrendingPeopleData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/person/day?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        // console.log(data);

        setTrendingData({ type: "people", person: data.results });
    };

    useEffect(() => {
        getTrendingMovieData();
    }, []);

    if (searchResults.results.length === 0) {
        // switch (category) {
        //     case "movie":
        //         getTrendingMovieData();
        //         break;
        //     case "tv":
        //         getTrendingTVData();
        //         break;
        //     case "people":
        //         getTrendingPeopleData();
        //         break;
        //     default:
        //         break;
        // }
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
                                    index={index}
                                    tvshow={item}
                                    key={item.id}
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
