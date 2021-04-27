/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { addPlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import User from "./user"

export default function Startcreator() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state && state.user);

    const [input, setInput] = useState();
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        // e.preventDefault();
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setError(false);
    };

    const handleClick = (e) => {
        // console.log(input)
        
        if (input.description && input.title) {
           
            dispatch(addPlaylist(input));
            setError(false);
        
            } else {
                 e.preventDefault();
                console.log("Error")
            return setError("Please fill out all required fields");
        
            
        }
    };

    return (
        <section id="intro">
        
            <h2>Create your playlist</h2>
            <p className="intro">
                This is where the magic happens. Requirements:
            
                <li className="requirements">Title & description are required!</li>
                <li className="requirements">Minimum items on playlists: 3</li>
                <li className="requirements">Maximum items on playlists: 10</li>

                
          
            </p>
            <section className="forms">
                <h3 onChange={(e) => handleChange(e)} className="labels">
                    Title*
                </h3>
                <input
                    onChange={(e) => handleChange(e)}
                    className="required"
                    name="title"
                    placeholder="Your title here"
                ></input>
                <h3 className="labels">Description*</h3>
                <textarea
                    onChange={(e) => handleChange(e)}
                    className="required"
                    name="description"
                    placeholder="Your description here"
                ></textarea>
                {error && <p className="error">{error}</p>}
                {input && <Link to="/select">
                    <button
                        onClick={(e) => handleClick(e)}
                        className="required"
                    >
                        Next
                    </button>
                </Link>}
            </section>
        </section>
    );
}
