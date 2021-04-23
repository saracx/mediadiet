/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";

export default function Selectcreator() {
    const [playlistStatus, setPlaylistStatus] = useState();
    const [input, setInput] = useState({});
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);

    console.log("playlist in select", playlist);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, [playlistStatus]);

    if (!playlist) {
        return null;
    }

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setInput((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    //     setError(false);
    // };

    // const handleClick = (e) => {
    //     if (!input || !input.title || !input.description) {
    //         return setError("Please fill out all required fields");
    //     }
    //     e.preventDefault();
    //     dispatch(addPlaylist(input));
    //     setError(false);
    //     location.replace("/select");
    // };

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
            <button className="finish-button">Finish</button>
        </section>
    );
}

//  <section className="select-form">
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     className="required"
//                     name="title"
//                     placeholder="title"
//                 ></input>
//                 <h3 className="labels">Description*</h3>
//                 <textarea
//                     onChange={(e) => handleChange(e)}
//                     className="description-selection"
//                     name="description"
//                     placeholder="description"
//                 ></textarea>
//                 {error && <p className="error">{error}</p>}
//             </section>
//             <Link to="/select">
//                 <button onClick={(e) => handleClick(e)} className="required">
//                     Add more
//                 </button>
//             </Link>
