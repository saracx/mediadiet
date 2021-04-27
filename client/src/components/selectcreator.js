/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";
import axios from "../axios";
import Preview from "./preview";
import Startcreator from "./startcreator";

export default function Selectcreator() {
    const noImage = "/no-results.png";
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);
    let [children, setChildren] = useState([]);
    let [displayButton, setDisplayButton] = useState(true);
    let [drafts, setDraft] = useState();

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, []);


    useEffect(() => {
        playlist &&
            (async () => {
                try {
                    const { data } = await axios.get(
                        "/api/playlist/items/" + playlist.id
                    );

                    if (data.success && data.items) {
                        setDraft(data.items)
                        console.log("There should be nothing here", data.items)

                    } else {
                       console.log("Do nothing because there is no draft?")
                    }
                } catch (err) {
                    console.log("There was an error at mixtapes", err);
                }
            })();
    }, [items]);


    // useEffect(() => {
    //     window.addEventListener("beforeunload", (ev) => {
    //         ev.preventDefault();
    //         return (ev.returnValue = "Are you sure you want to close?");
    //     });
    // });

    const handleClick = async () => {
        if (items.length < 3) {
            setError(
                "Sorry, you have to select at least three items for your playlist!"
            );
        }
        else {
            location.replace("/create-playlist#/finish");
        }
    };

    if (!playlist) {
        return <Startcreator></Startcreator>
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

            <h2>
                Select items for{" "}
                {playlist && (
                    <span className="playlist-name">{playlist.title} 👇</span>
                )}
            </h2>
            {drafts &&

            drafts.map((item) => {
                console.log("Logging the drafted item", item)
                return (<Selector item={item} key={item.id}></Selector>)

            })}

            
            <div>
            <Selector key="1"></Selector>
            <Selector key="2"></Selector>
            <Selector key="3"></Selector>
            </div>
            
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
            </div>
        </section>
    );
}
