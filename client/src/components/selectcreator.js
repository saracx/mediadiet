/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";

export default function Selectcreator() {
    const [playlistStatus, setPlaylistStatus] = useState();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);
    console.log("items in selectcreator", items);

    // console.log("playlist in select", playlist);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, [playlistStatus]);

    if (!playlist) {
        return null;
    }

    return (
        <section id="playlist-selector">
            <h3>
                Select items for{" "}
                {playlist && (
                    <span className="playlist-name">{playlist.title}</span>
                )}
            </h3>
            <Selector></Selector>
            <Selector></Selector>
            <Selector></Selector>
            <button className="add-more">Add more items</button>

            <div>
                {items &&
                    items.map((item, i) => {
                        console.log("item in selectcreator", item);
                        return <img key={item.i} src={item.image}></img>;
                    })}
            </div>
            <button className="finish-button">Finish</button>
        </section>
    );
}
