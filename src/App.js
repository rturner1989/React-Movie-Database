import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Homepage from "./components/Homepage/homepage";
import Searchbar from "./components/Searchbar/searchbar";
import SearchResults from "./components/SearchResults/searchresults";
import FullScreenResult from "./components/FullScreenResult/fullscreenresult";

export default function App() {
    return (
        <Router>
            <div id="app-container">
                <Navbar />
                <Switch>
                    <Route path="/search">
                        <Searchbar />
                        <SearchResults />
                    </Route>
                    <Route path="/result/movie/:id">
                        <FullScreenResult />
                    </Route>
                    {/* <Route path="/result/tv/:id">
                        <FullScreenResult />
                    </Route>
                    <Route path="/result/people/:id">
                        <FullScreenResult />
                    </Route> */}
                    <Route path="/">
                        <Homepage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
