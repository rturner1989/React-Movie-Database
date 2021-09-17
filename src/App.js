import React from "react";
import Searchbar from "./components/Searchbar/searchbar";
import SearchResults from "./components/SearchResults/searchresults";

function App() {
    return (
        <div id="app-container">
            <Searchbar />
            <SearchResults />
        </div>
    );
}

export default App;
