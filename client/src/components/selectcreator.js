/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";
import axios from "../axios";
import Preview from "./preview";

export default function Selectcreator() {
    const noImage = "/no-results.png";
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);
    let [children, setChildren] = useState([]);
    let [displayButton, setDisplayButton] = useState(true);

    console.log("playlist in select", playlist);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, []);

    useEffect(() => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return (ev.returnValue = "Are you sure you want to close?");
        });
    });

    const handleClick = async () => {
        if (items.length <= 3) {
            setError(
                "Sorry, you have to select at least three items for your playlist!"
            );
        }

        let { id } = playlist;
        const { data } = await axios.post("/api/playlist/items", { id, items });
        if (data.success) {
            location.replace("/create-playlist#/finish");
        }
    };

    if (!playlist) {
        return null;
    }

    const handleAddMore = () => {
        let numChildren = children.length;
        if (numChildren < 7) {
            console.log("should be pushing!");
            setChildren([...children, <Selector key={3 + numChildren} />]);
        } else {
            setError("Sorry, you've reached the maximum number of items!");
            setDisplayButton(false);
        }
    };

    return (
        <section id="playlist-selector">
            <h3>
                Select items for{" "}
                {playlist && (
                    <span className="playlist-name">{playlist.title}</span>
                )}
            </h3>
            <Selector key="1"></Selector>
            <Selector key="2"></Selector>
            <Selector key="3"></Selector>
            {children}
            {error && <p className="error">{error}</p>}
            <div className="button-wrapper">
                {displayButton && (
                    <button
                        onClick={() => handleAddMore()}
                        className="add-more"
                    >
                        Add more items
                    </button>
                )}
                <button onClick={() => handleClick()} className="finish-button">
                    Next
                </button>
                <Preview></Preview>
            </div>
        </section>
    );
}
