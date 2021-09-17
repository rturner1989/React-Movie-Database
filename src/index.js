import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./components/Navbar/navbar.css";
import "./components/Homepage/homepage.css";
import "./components/Searchbar/searchbar.css";
import "./components/SearchResults/searchresults.css";
import "./components/FullScreenResult/fullscreenresult.css";
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
