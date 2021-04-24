/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { addPlaylist } from "../redux/actions";
import Startcreator from "./startcreator";
import Selectcreator from "./selectcreator";
import Finishcreator from "./finishcreator";
import { HashRouter, Route } from "react-router-dom";

export default function Playlisteditor() {
    return (
        <div id="playlist-editor">
            <HashRouter>
                <Route exact path="/" component={Startcreator} />
                <Route path="/select" component={Selectcreator} />
                <Route path="/finish" component={Finishcreator} />
            </HashRouter>
        </div>
    );
}
