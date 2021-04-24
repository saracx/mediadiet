/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";
import axios from "../axios";
import Preview from "./preview";

export default function Finishcreator() {
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);

    return (
        <section id="finish">
            <Preview></Preview>
        </section>
    );
}
