/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { addPlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import {receivePlaylist} from "../redux/actions"
import User from "./user"
import Preview from "./preview"
import Selector from "./selectors"
import Publish from "./publish"
import DeletePlaylist from "./delete"

export default function Startcreator() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state && state.user);
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);

    console.log("items in startcreator", items)

    const [input, setInput] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, []);

    // useEffect(() => {
    //     playlist && 
    //     (async () => {
            
    //         try {
    //             // This checks if there are any drafts
    //             const { data } = await axios.get("/api/mixtape/" + playlist.id);
    //             console.log("data", data.mixtape)
    //         }

    //         catch (err) {
    //             console.log(err)
    //         }

    //     })();
    // }, [playlist]);



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

    if (!playlist) {
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

    if (playlist) {

       return (<div id="intro"><span className="italic">Do you wish to continue working on your last mixtape?</span> 
       
       <Preview></Preview>
       <Selector></Selector>
       <DeletePlaylist id={playlist.id}></DeletePlaylist><Publish id={playlist.id}></Publish>
       </div>
)
    }
}
