import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({
        category: "",
        results: [],
    });
    const [watchList, setWatchList] = useState({
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
    const [lastAdded, setLastAdded] = useState(false);
    const [lastRemoved, setLastRemoved] = useState(false);

    const searchMovies = async (query) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&query=${query}&page=1&include_adult=false`
        );
        const data = await response.json();
        console.log(data);
        setSearchResults({ category: "movie", results: data.results });
    };

    const searchTVShows = async (query) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&query=${query}&page=1&include_adult=false`
        );
        const data = await response.json();
        console.log(data);
        setSearchResults({ category: "tv", results: data.results });
    };

    const searchPeople = async (query) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=9ddeebbe780fac8f3f13322ce56a87af&language=en-GB&query=${query}&page=1&include_adult=false`
        );
        const data = await response.json();
        console.log(data);
        setSearchResults({ category: "people", results: data.results });
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
            };
            setWatchList({
                ...watchList,
                movie: [...watchList.movie, obj],
            });
            setLastAdded(true);
        } else if (category === "tv") {
            const obj = {
                id: item.id,
                title: item.name,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
            };
            setWatchList({
                ...watchList,
                tv: [...watchList.tv, obj],
            });
            setLastAdded(true);
        }
    };

    const removeFromWatchList = (category, id) => {
        if (category === "movie") {
            setWatchList({
                ...watchList,
                movie: watchList.movie.filter((item) => item.id !== id),
            });
            setLastRemoved(true);
        } else if (category === "tv") {
            setWatchList({
                ...watchList,
                tv: watchList.tv.filter((item) => item.id !== id),
            });
            setLastRemoved(true);
        }
    };

    const isMovieInWatchlist = (id) => {
        return watchList.movie.find((item) => item.id === id);
    };
    const isTvShowInWatchlist = (id) => {
        return watchList.tv.find((item) => item.id === id);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLastAdded(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [lastAdded]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLastRemoved(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [lastRemoved]);

    useEffect(() => {
        const LocalSaveWatchlist = localStorage.getItem("Watchlist");
        console.log(LocalSaveWatchlist);
        if (LocalSaveWatchlist) {
            setWatchList(JSON.parse(LocalSaveWatchlist));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("Watchlist", JSON.stringify(watchList));
    }, [watchList]);

    return (
        <AppContext.Provider
            value={{
                trendingData,
                setTrendingData,
                search,
                searchResults,
                watchList,
                setWatchList,
                addToWatchList,
                removeFromWatchList,
                isMovieInWatchlist,
                isTvShowInWatchlist,
                convertDate,
                lastAdded,
                setLastAdded,
                lastRemoved,
                setLastRemoved,
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
