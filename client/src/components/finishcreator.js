/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist, receiveItems } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";
import axios from "../axios";
import Preview from "./preview";

export default function Finishcreator() {
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);
    const dispatch = useDispatch();
    const [error, setError] = useState();

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, []);

    const handleClick = async (e) => {
        if (playlist) {
            let id = playlist.id;
            // e.preventDefault(e);
            try {
                const { data } = await axios.post("api/playlist/publish/" + id);

                if (data.success) {
                    return location.replace("/my-mixtapes");
                } else {
                    setError("Sorry, something went wrong here!");
                }
            } catch (err) {
                console.log("Error in publish playlist");
            }
        } else {
            setError("Sorry, we couldn't publish this playlist");
        }
    };

    if (!playlist) {
        return null;
    }
    if (!items) {
        return null;
    }

    console.log("do we have items?", items);

    return (
        <section id="finish">
            <Preview></Preview>
            <button onClick={(e) => handleClick(e)}>👉 Publish</button>
            {error && <p className="error">{error}</p>}
        </section>
    );
}
