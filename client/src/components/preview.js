/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { receivePlaylist } from "../redux/actions";
import { Link } from "react-router-dom";
import Selector from "./selectors";
import axios from "../axios";
import {addNewItem, deleteItem} from "../redux/actions"
import DeletePlaylist from "./delete";

export default function Preview() {
    const noImage = "/no-results.png";
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    const items = useSelector((state) => state && state.items);

    console.log("items in state", items);

    useEffect(() => {
        !playlist && dispatch(receivePlaylist());
    }, []);


    useEffect(() => {
         if (playlist.id && items.length == 0){
        (async () => {
            
            try {
                const { data } = await axios.get("/api/mixtape/" + playlist.id);
                console.log("data", data.mixtape)
                let itemArray = data.mixtape;
                if (data.success) {
                    itemArray.map((item) => {
                        dispatch(addNewItem(item))
                    })

                }
            }

            catch (err) {
                console.log(err)
            }

        })();
    }}, [items, playlist]);

    if (!playlist) {
        location.replace("/create-playlist")
    }

    const handleDeleteItem = (item) => {

        // global store will delete item from db
        dispatch(deleteItem(item))
    };

    return (
        <div className="preview-wrapper">
            {items && playlist && (
                <>
                <h2>
                    Your mixtape: &nbsp;{" "}
                    <span className="highlight">
                        <span className="playlist-name">{playlist.title}</span>
                    </span>
                   
                </h2> <p className="description">"{playlist.description}"</p>
                
                
                </>
            )}
            <div className="preview">
                <div className="single-items">
                    {items &&
                        items.map((item, i) => {
                            console.log(item)
                          
                                return (
                                    <section  key={item.id + i} className="section-wrapper">
                                    <img className="final-playlist-view"
                                        
                                        src={
                                            item.image || noImage
                                        }
                                    ></img>
                                    <div className="garbage" onClick={() => handleDeleteItem(item)}>🚮</div>
                                    </section>
                                );
                        }
                        )
                    }
                </div>
            </div>
        </div>
    );
}
