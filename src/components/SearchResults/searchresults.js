import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import MovieResultData from "../SearchResultsCard/movieresultdata";
import TvResultData from "../SearchResultsCard/tvresultdata";
import PeopleResultData from "../SearchResultsCard/peopleresultdata";
import TrendingData from "../SearchTrending/trendingdata";

const SearchResults = () => {
    const { searchResults, trendingData, setTrendingData } = useGlobalContext();

    const getTrendingMovieData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        return data.results;
    };
    const getTrendingTVData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/tv/day?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        return data.results;
    };
    const getTrendingPeopleData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/person/day?api_key=9ddeebbe780fac8f3f13322ce56a87af`
        );
        const data = await response.json();
        return data.results;
    };

    const getAllTrending = async () => {
        const obj = {
            type: "movie",
            movie: await getTrendingMovieData(),
            tv: await getTrendingTVData(),
            person: await getTrendingPeopleData(),
        };
        setTrendingData(obj);
    };

    useEffect(() => {
        getAllTrending();
    }, []);

    if (searchResults.results.length === 0) {
        switch (trendingData.type) {
            case "movie":
                return (
                    <div className="trending-data-container">
                        {trendingData.movie.map((film) => {
                            return (
                                <TrendingData
                                    key={film.id}
                                    id={film.id}
                                    title={film.title}
                                    img={film.poster_path}
                                    link={"movie"}
                                />
                            );
                        })}
                    </div>
                );
            case "tv":
                return (
                    <div className="trending-data-container">
                        {trendingData.tv.map((show) => {
                            return (
                                <TrendingData
                                    key={show.id}
                                    id={show.id}
                                    title={show.name}
                                    img={show.poster_path}
                                    link={"tv"}
                                />
                            );
                        })}
                    </div>
                );
            case "people":
                return (
                    <div className="trending-data-container">
                        {trendingData.person.map((peep) => {
                            return (
                                <TrendingData
                                    key={peep.id}
                                    id={peep.id}
                                    title={peep.name}
                                    img={peep.profile_path}
                                    link={"people"}
                                />
                            );
                        })}
                    </div>
                );
            default:
                break;
        }
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
