import React from "react";
import Searchbar from "./components/searchbar";
import SearchResults from "./components/searchresults";

function App() {
    return (
        <div id="app-container">
            <Searchbar />
            <SearchResults />
        </div>
    );
}

export default App;
