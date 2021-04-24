/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";
import axios from "../axios";

export default function Preview() {
    const noImage = "/no-results.png";
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, []);

    if (!playlist) {
        return null;
    }

    return (
        <div className="preview-wrapper">
            {items && <h2>Preview {playlist.title}</h2>}
            <div className="preview">
                <div className="single-items">
                    {items &&
                        items.map((item, i) => {
                            if (item.image.smallThumbnail) {
                                return (
                                    <img
                                        key={i}
                                        src={
                                            item.image.smallThumbnail || noImage
                                        }
                                    ></img>
                                );
                            } else {
                                return (
                                    <img
                                        key={i}
                                        src={item.image || noImage}
                                    ></img>
                                );
                            }
                        })}
                </div>
            </div>
        </div>
    );
}
