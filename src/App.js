import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Homepage from "./components/Homepage/homepage";
import Searchbar from "./components/Searchbar/searchbar";
import SearchResults from "./components/SearchResults/searchresults";
import MovieFullScreenResult from "./components/FullScreenResult/moviefullscreenresult";
import TvFullScreenResult from "./components/FullScreenResult/tvfullscreenresult";
import PeopleFullScreenResult from "./components/FullScreenResult/peoplefullscreenresults";

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
                        <MovieFullScreenResult />
                    </Route>
                    <Route path="/result/tv/:id">
                        <TvFullScreenResult />
                    </Route>
                    <Route path="/result/people/:id">
                        <PeopleFullScreenResult />
                    </Route>
                    <Route path="/">
                        <Homepage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
