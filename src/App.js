import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Homepage from "./components/Homepage/homepage";
import MovieFullScreenResult from "./components/FullScreenResult/moviefullscreenresult";
import TvFullScreenResult from "./components/FullScreenResult/tvfullscreenresult";
import PeopleFullScreenResult from "./components/FullScreenResult/peoplefullscreenresults";
import Watchlist from "./components/Watchlist/watchlist";
import Search from "./components/Search/Search";
import Addremovewatchlist from "./components/Navbar/addremovewatchlist";

export default function App() {
    return (
        <Router>
            <div id="app-container">
                <Navbar />
                <Addremovewatchlist />
                <Switch>
                    <Route path="/search">
                        <Search />
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
                    <Route path="/watchlist">
                        <Watchlist />
                    </Route>
                    <Route path="/">
                        <Homepage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
