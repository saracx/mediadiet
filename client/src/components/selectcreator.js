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
    let [children, setChildren] = useState([]);
    let [displayButton, setDisplayButton] = useState(true);

    // console.log("playlist in select", playlist);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, [playlistStatus]);

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
        console.log("numchildren", numChildren);
        console.log(children);
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
            {error && <p>{error}</p>}
            <div className="button-wrapper">
                {displayButton && (
                    <button
                        onClick={() => handleAddMore()}
                        className="add-more"
                    >
                        Add more items
                    </button>
                )}
                <button className="finish-button">Next</button>
            </div>

            <div>
                {items &&
                    items.map((item, i) => {
                        console.log("item in selectcreator", item);
                        return <img key={item.i} src={item.image}></img>;
                    })}
            </div>
        </section>
    );
}
