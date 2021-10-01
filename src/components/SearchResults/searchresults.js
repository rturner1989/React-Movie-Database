import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import MovieTVResultData from "./SearchResultsCard/movietvresultdata";
import PeopleResultData from "./SearchResultsCard/peopleresultdata";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import TrendingData from "./SearchTrending/trendingdata";

const SearchResults = () => {
    const {
        searchResults,
        trendingData,
        setTrendingData,
        isMovieInWatchlist,
        isTvShowInWatchlist,
    } = useGlobalContext();

    const movieTrendingRef = useHorizontalScroll(false);
    const tvTrendingRef = useHorizontalScroll(false);
    const peopleTrendingRef = useHorizontalScroll(false);

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
                        {searchResults.movie.map((movie) => {
                            return (
                                <MovieTVResultData
                                    key={movie.id}
                                    id={movie.id}
                                    found={isMovieInWatchlist(movie.id)}
                                    linkTo={`/result/movie/${movie.id}`}
                                    img={movie.poster_path}
                                    title={movie.title}
                                    release={movie.release_date}
                                    overview={movie.overview}
                                    type={"movie"}
                                    vote={movie.vote_average}
                                />
                            );
                        })}
                    </div>
                );
            case "tv":
                return (
                    <div className="search-results-container">
                        {searchResults.tv.map((tvshow) => {
                            return (
                                <MovieTVResultData
                                    key={tvshow.id}
                                    id={tvshow.id}
                                    found={isTvShowInWatchlist(tvshow.id)}
                                    linkTo={`/result/tv/${tvshow.id}`}
                                    img={tvshow.poster_path}
                                    title={tvshow.name}
                                    release={tvshow.first_air_date}
                                    overview={tvshow.overview}
                                    type={"tv"}
                                    vote={tvshow.vote_average}
                                />
                            );
                        })}
                    </div>
                );
            case "people":
                return (
                    <div className="people-search-results-container">
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
            default:
                break;
        }
    }
};

export default SearchResults;
