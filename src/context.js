import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { BiUpArrow } from "react-icons/bi";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({
        category: "movie",
        movie: [],
        tv: [],
        people: [],
        query: {},
    });
    const [watchList, setWatchList] = useLocalStorage("Watchlist", {
        category: "movie",
        movie: [],
        tv: [],
    });
    const [trendingData, setTrendingData] = useState({
        type: "movie",
        movie: [],
        tv: [],
        person: [],
    });
    const [watchListAlert, setWatchListAlert] = useState({
        isAdded: false,
        isRemoved: false,
        title: "",
    });
    const [expandBiography, setExpandBiography] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [movieCount, setMovieCount] = useState(0);
    const [tvCount, setTvCount] = useState(0);
    const [isScroll, setIsScroll] = useState(false);
    const [showHideAlert, setShowHideAlert] = useState(false);

    const searchMovies = async (query) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&query=${query}&page=1&include_adult=false`
        );
        const data = await response.json();
        setSearchResults({
            ...searchResults,
            category: "movie",
            movie: data.results,
            query: { ...searchResults.query, movie: query },
        });
    };

    const searchTVShows = async (query) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&query=${query}&page=1&include_adult=false`
        );
        const data = await response.json();
        setSearchResults({
            ...searchResults,
            category: "tv",
            tv: data.results,
            query: { ...searchResults.query, tv: query },
        });
    };

    const searchPeople = async (query) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&query=${query}&page=1&include_adult=false`
        );
        const data = await response.json();
        setSearchResults({
            ...searchResults,
            category: "people",
            people: data.results,
            query: { ...searchResults.query, person: query },
        });
    };

    const search = async (category, query) => {
        switch (category) {
            case "movie":
                searchMovies(query);
                break;
            case "tv":
                searchTVShows(query);
                break;
            case "people":
                searchPeople(query);
                break;
            default:
                break;
        }
    };

    const convertDate = (info) => {
        const date = new Date(info);
        const string = date.toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return string;
    };

    const addToWatchList = (category, item) => {
        if ([...watchList.movie, ...watchList.tv].find((w) => w.id === item.id))
            return;
        if (category === "movie") {
            const obj = {
                id: item.id,
                title: item.title,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                date_added: Date.now(),
                overview: item.overview,
            };
            setWatchList({
                ...watchList,
                movie: [...watchList.movie, obj],
            });
            setWatchListAlert({
                isAdded: true,
                isRemoved: false,
                title: item.title,
            });
        } else if (category === "tv") {
            const obj = {
                id: item.id,
                name: item.name,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                date_added: Date.now(),
                overview: item.overview,
            };
            setWatchList({
                ...watchList,
                tv: [...watchList.tv, obj],
            });
            setWatchListAlert({
                isAdded: true,
                isRemoved: false,
                title: item.name,
            });
        }
    };

    const removeFromWatchList = (category, id) => {
        if (category === "movie") {
            setWatchList({
                ...watchList,
                movie: watchList.movie.filter((item) => item.id !== id),
            });
            setWatchListAlert({
                isAdded: false,
                isRemoved: true,
                title: watchList.movie.find((item) => item.id === id).title,
            });
        } else if (category === "tv") {
            setWatchList({
                ...watchList,
                tv: watchList.tv.filter((item) => item.id !== id),
            });
            setWatchListAlert({
                isAdded: false,
                isRemoved: true,
                title: watchList.tv.find((item) => item.id === id).name,
            });
        }
    };

    const isMovieInWatchlist = (id) => {
        return watchList.movie.find((item) => item.id === id);
    };
    const isTvShowInWatchlist = (id) => {
        return watchList.tv.find((item) => item.id === id);
    };

    const toggleWatchlistCategory = () => {
        setWatchList({
            ...watchList,
            category: watchList.category === "movie" ? "tv" : "movie",
        });
    };

    const returnToTop = (ref) => {
        if (isScroll) {
            return (
                <button
                    className="return-to-top"
                    onClick={() => {
                        ref.current.scrollTop = 0;
                    }}
                >
                    <BiUpArrow className="up-icon" />
                </button>
            );
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHideAlert(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [showHideAlert]);

    useEffect(() => {
        setMovieCount(watchList.movie.length);
        setTvCount(watchList.tv.length);
    }, [watchList]);

    return (
        <AppContext.Provider
            value={{
                trendingData,
                setTrendingData,
                setSearchResults,
                search,
                searchResults,
                watchList,
                setWatchList,
                addToWatchList,
                removeFromWatchList,
                isMovieInWatchlist,
                isTvShowInWatchlist,
                convertDate,
                watchListAlert,
                movieCount,
                tvCount,
                expandBiography,
                setExpandBiography,
                modalContent,
                setModalContent,
                toggleWatchlistCategory,
                isScroll,
                setIsScroll,
                returnToTop,
                showHideAlert,
                setShowHideAlert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
export const useGlobalContext = () => {
    return useContext(AppContext);
};
