import { BrowserRouter, Route } from "react-router-dom";
import Logout from "./logout";
import Landingscreen from "./landingscreen";
import Navigation from "./navigation";
import Logo from "./logo";
import Playlisteditor from "./playlist_editor";
import MyMixtapes from "./mymixtapes.js";
import ThisMixtape from "./thismixtape";

import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { receiveUser } from "../redux/actions";

export default function App() {
    const user = useSelector((state) => state && state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        !user && dispatch(receiveUser());
    }, []);

    return (
        <div id="app">
            <BrowserRouter>
                <nav id="navigation">
                    <Logo></Logo>
                    <Navigation></Navigation>
                </nav>
                <div id="main">
                    <Route exact path="/" render={() => <Landingscreen />} />
                    <Route
                        path="/create-playlist"
                        render={() => <Playlisteditor />}
                    />
                    <Route path="/my-mixtapes" render={() => <MyMixtapes />} />
                    <Route path="/mixtape/:id" render={() => <ThisMixtape />} />
                </div>
            </BrowserRouter>
            <Logout></Logout>
        </div>
    );
}
