/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { addPlaylist } from "../redux/actions";
import { Link } from "react-router-dom";

export default function Startcreator() {
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    console.log(playlist);

    const [input, setInput] = useState({});
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setError(false);
    };

    const handleClick = (e) => {
        if (!input || !input.title || !input.description) {
            return setError("Please fill out all required fields");
        }
        dispatch(addPlaylist(input));
        setError(false);
    };

    return (
        <section id="intro">
            <p>
                This is where the magic happens: you can decide what ends up on
                your mixed-media playlist, if it has a common theme or idea or
                if it's super randomly structured. Basically, you can do
                whatever you want if you regard the requirements:
                <br></br>
            </p>
            <ul>
                <li>Minimum items on playlists: 3</li>
                <li>Maximum items on playlists: 10</li>
                <li>
                    You have to write a short description why you chose those
                    items for your playlist
                </li>
                <li>Title & description are necessary!</li>
            </ul>
            <section className="forms">
                <h3 onChange={(e) => handleChange(e)} className="labels">
                    Title*
                </h3>
                <input
                    onChange={(e) => handleChange(e)}
                    className="required"
                    name="title"
                    placeholder="title"
                ></input>
                <h3 className="labels">Description*</h3>
                <textarea
                    onChange={(e) => handleChange(e)}
                    className="required"
                    name="description"
                    placeholder="description"
                ></textarea>
                {error && <p className="error">{error}</p>}
                <Link to="/select">
                    <button
                        onClick={(e) => handleClick(e)}
                        className="required"
                    >
                        Next
                    </button>
                </Link>
            </section>
        </section>
    );
}
