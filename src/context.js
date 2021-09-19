import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({
        category: "",
        results: [],
    });
    const [watchList, setWatchList] = useState([{ category: "", list: [] }]);

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

    const addToWatchList = (category, item) => {
        setWatchList([...watchList, { category: category, list: item }]);
    };

    return (
        <AppContext.Provider
            value={{ search, searchResults, watchList, addToWatchList }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
export const useGlobalContext = () => {
    return useContext(AppContext);
};
