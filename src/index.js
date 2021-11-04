import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./components/Navbar/navbar.css";
import "./components/Homepage/homepage.css";
import "./components/Search/Searchbar/searchbar.css";
import "./components/Search/SearchResults/searchresults.css";
import "./components/FullScreenResult/fullscreenresults.css";
import "./components/Watchlist/watchlist.css";
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
