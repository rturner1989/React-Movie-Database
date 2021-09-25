import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./components/Navbar/navbar.css";
import "./components/Homepage/homepage.css";
import "./components/Searchbar/searchbar.css";
import "./components/SearchResults/searchresults.css";
import "./components/FullScreenResult/fullscreenresults.css";
import "./components/FullScreenResult/peoplefullscreenresults.css";
import "./components/SearchResultsCard/movieresultdata.css";
import "./components/SearchResultsCard/tvresultdata.css";
import "./components/SearchResultsCard/peopleresultdata.css";
import "./components/SearchTrending/trendingdata.css";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
