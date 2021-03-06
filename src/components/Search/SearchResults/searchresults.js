import React, { useEffect } from "react";
import { useGlobalContext } from "../../../context";
import MovieTVResultData from "./SearchResultsCard/movietvresultdata";
import PeopleResultData from "./SearchResultsCard/peopleresultdata";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import TrendingData from "./SearchTrending/trendingdata";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Carousel from "../../Carousel/Carousel";

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

    const [windowDimensions] = useWindowDimensions();

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

    if (windowDimensions.width <= 450) {
        switch (trendingData.type) {
            case "movie":
                if (searchResults.movie.length === 0) {
                    return (
                        <div className="trending-carousel-container">
                            <div className="search-trending-title-container">
                                <h2 className="search-trending-title">
                                    Trending Movies
                                </h2>
                            </div>
                            <Carousel>
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
                            </Carousel>
                        </div>
                    );
                } else {
                    return (
                        <div className="search-results-container">
                            <h3 className="showing-results-for">
                                Showing results for "
                                {searchResults.query.movie.toUpperCase()}"
                            </h3>

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
                }
            case "tv":
                if (searchResults.tv.length === 0) {
                    return (
                        <div className="trending-carousel-container">
                            <div className="search-trending-title-container">
                                <h2 className="search-trending-title">
                                    Trending TV Shows
                                </h2>
                            </div>
                            <Carousel>
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
                            </Carousel>
                        </div>
                    );
                } else {
                    return (
                        <div className="search-results-container">
                            <h3 className="showing-results-for">
                                Showing results for "
                                {searchResults.query.tv.toUpperCase()}"
                            </h3>
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
                }
            case "people":
                if (searchResults.people.length === 0) {
                    return (
                        <div className="trending-carousel-container">
                            <div className="search-trending-title-container">
                                <h2 className="search-trending-title">
                                    Trending People
                                </h2>
                            </div>
                            <Carousel>
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
                            </Carousel>
                        </div>
                    );
                } else {
                    return (
                        <div className="people-search-results-container">
                            <h3 className="showing-results-for">
                                Showing results for "
                                {searchResults.query.person.toUpperCase()}"
                            </h3>
                            <div className="people-search-results">
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
                        </div>
                    );
                }
            default:
                break;
        }
    }
    switch (trendingData.type) {
        case "movie":
            if (searchResults.movie.length === 0) {
                return (
                    <div className="trending-movie-container">
                        <div className="search-trending-title-container">
                            <h2 className="search-trending-title">
                                Trending Movies
                            </h2>
                        </div>
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
                    </div>
                );
            } else {
                return (
                    <div className="search-results-container">
                        <h3 className="showing-results-for">
                            Showing results for "
                            {searchResults.query.movie.toUpperCase()}"
                        </h3>
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
            }
        case "tv":
            if (searchResults.tv.length === 0) {
                return (
                    <div className="trending-movie-container">
                        <div className="search-trending-title-container">
                            <h2 className="search-trending-title">
                                Trending TV Shows
                            </h2>
                        </div>
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
                    </div>
                );
            } else {
                return (
                    <div className="search-results-container">
                        <h3 className="showing-results-for">
                            Showing results for "
                            {searchResults.query.tv.toUpperCase()}"
                        </h3>
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
            }
        case "people":
            if (searchResults.people.length === 0) {
                return (
                    <div className="trending-movie-container">
                        <div className="search-trending-title-container">
                            <h2 className="search-trending-title">
                                Trending People
                            </h2>
                        </div>
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
                    </div>
                );
            } else {
                return (
                    <div className="people-search-results-container">
                        <h3 className="showing-results-for">
                            Showing results for "
                            {searchResults.query.person.toUpperCase()}"
                        </h3>
                        <div className="people-search-results">
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
                    </div>
                );
            }
        default:
            break;
    }
};

export default SearchResults;
