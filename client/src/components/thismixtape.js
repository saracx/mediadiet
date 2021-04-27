import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Share } from 'react-twitter-widgets'

export default function ThisMixtape({ first }) {
    const { id } = useParams();
    const user = useSelector((state) => state && state.user);
    const windowUrl = window.location.href


    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState([]);

    const [error, setError] = useState("");

    const shareOntwitter = () => {
    var url = `https://twitter.com/intent/tweet?url=${windowUrl}&via=mediadiet&text=Check out this mixtape`;
    window.open(url);
    return false;
 }


    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/mixtape/" + id);
                // console.log("data in ThisMixtape", data);
                if (data.success) {
                    setItems(data.mixtape);
                    setMeta(data.meta.rows[0]);
                } else {
                    setError("Sorry, something went wrong!");
                }
            } catch (err) {
                console.log("There was an error at single mixtape view", err);
            }
        })();
    }, []);


    if (!items || !meta) {
        return <h2>There is no mixtape with this id! </h2>;
    }

    return (
        <div id="my-playlists">

        {!user && <div className="new-user">Looks like you're new here! <a href="/welcome">Sign up</a> or <a href="/twitter">login with Twitter</a> to create your own mixtape.</div>}
            <h2>
                <span className="highlight">
                    <b>Mixtape</b>:{" "}
                    <span className="playlist-name">{meta.title}</span>
                </span>
            </h2>
            <p className="description">by <a className="user-name" href={"http://www.twitter.com/" + meta.first}>@{meta.first}</a></p>
            <br></br>
            <p className="description">"{meta.description}"</p>
            <p className="description-meta">
                published: &nbsp;
                {meta.created_at}
            </p>
             
             
             <a className="twitter-share" onClick={() => shareOntwitter()}> Tweet </a>

             

            <div className="mixtape-view">
                {items.map((item, i) => {
                    i++;
                    if (item.type == "movie") {
                        Object.assign(item, {icon: "🎬"});
                        
                    }
                    return (
                        <div key={i + item.id} className="item">
                    
                            <img
                                alt={item.title}
                                className="small-image"
                                src={item.image}
                            ></img>

                            <div className="item-info">
                                <a href={item.url} target="_blank">
                                    <h4>
                                        {i}.{item.title}
                                    </h4>
                                </a>
                                <p className="item-meta">{item.year}</p>
                                <p className="item-meta">{item.icon || item.type} </p> 
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
