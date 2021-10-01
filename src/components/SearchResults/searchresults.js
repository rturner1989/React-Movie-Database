import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import MovieTVResultData from "./SearchResultsCard/movietvresultdata";
import PeopleResultData from "./SearchResultsCard/movietvresultdata";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import TrendingData from "./SearchTrending/trendingdata";

const SearchResults = () => {
    const {
        searchResults,
        trendingData,
        setTrendingData,
        isMovieInWatchList,
        isTvShowInWatchlist,
    } = useGlobalContext();

    const movieTrendingRef = useHorizontalScroll();
    const tvTrendingRef = useHorizontalScroll();
    const peopleTrendingRef = useHorizontalScroll();

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

    if (
        searchResults.movie.length === 0 &&
        searchResults.tv.length === 0 &&
        searchResults.people.length === 0
    ) {
        switch (trendingData.type) {
            case "movie":
                return (
                    <div
                        className="trending-data-container"
                        ref={movieTrendingRef}
                    >
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
                    <div
                        className="trending-data-container"
                        ref={tvTrendingRef}
                    >
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
                    <div
                        className="trending-data-container"
                        ref={peopleTrendingRef}
                    >
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
        switch (searchResults.category) {
            case "movie":
                return (
                    <div className="search-results-container">
                        {searchResults.movie.map((item) => {
                            return (
                                <MovieTVResultData
                                    key={item.id}
                                    id={item.id}
                                    found={isMovieInWatchList(item.id)}
                                    linkTo={`/result/movie/${item.id}`}
                                    img={item.poster_path}
                                    title={item.title}
                                    release={item.release_date}
                                    overview={item.overview}
                                    type={"movie"}
                                    addID={item}
                                />
                            );
                        })}
                    </div>
                );
            case "tv":
                return (
                    <div className="search-results-container">
                        {searchResults.tv.map((item) => {
                            return (
                                <MovieTVResultData
                                    key={item.id}
                                    id={item.id}
                                    found={isTvShowInWatchlist(item.id)}
                                    linkTo={`/result/tv/${item.id}`}
                                    img={item.poster_path}
                                    title={item.name}
                                    release={item.first_air_date}
                                    overview={item.overview}
                                    type={"tv"}
                                    addID={item}
                                />
                            );
                        })}
                    </div>
                );
            case "people":
                return (
                    <div className="search-results-container">
                        {searchResults.people.map((item, index) => {
                            return (
                                <PeopleResultData
                                    key={item.id}
                                    index={index}
                                    person={item}
                                />
                            );
                        })}
                    </div>
                );
        }
    }
};

export default SearchResults;
