import { BrowserRouter, Route } from "react-router-dom";
import Logout from "./logout";
import Landingscreen from "./landingscreen";
import Navigation from "./navigation";
import Logo from "./logo";
import Playlisteditor from "./playlist_editor";
import MyMixtapes from "./mymixtapes.js";
import ThisMixtape from "./thismixtape";
import AllMixtapes from "./allmixtapes";




import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { receiveUser } from "../redux/actions";
import SaraWasHere from "./sarawashere";

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
                    <Navigation user={user}></Navigation>
                </nav>
                <div id="main">
                    <Route exact path="/" render={() => <Landingscreen />} />
                    <Route
                        path="/create-playlist"
                        render={() => <Playlisteditor />}
                    />
                    <Route path="/my-mixtapes" render={() => <MyMixtapes />} />
                    <Route path="/mixtape/:id" render={() => <ThisMixtape />} />
                    <Route
                        path="/mixtapes/all"
                        render={() => <AllMixtapes />}
                    />
                     <Route
                        path="/imprint"
                        render={() => <SaraWasHere />}
                    />
                </div>
            </BrowserRouter>
        </div>
    );
}
