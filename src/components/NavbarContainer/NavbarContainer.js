import React from "react";
import { useGlobalContext } from "../../context";
import Addremovewatchlist from "./Navbar/addremovewatchlist";
import Navbar from "./Navbar/navbar";

const NavbarContainer = () => {
    const { showHideAlert } = useGlobalContext();

    const showOrHideAlert = () => {
        if (showHideAlert) {
            return <Addremovewatchlist />;
        } else {
            return <Navbar />;
        }
    };

    return <div id="navbar-watchlist-container">{showOrHideAlert()}</div>;
};

export default NavbarContainer;
