import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";

export default function ThisMixtape({ first }) {
    const { id } = useParams();

    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState([]);

    const [error, setError] = useState("");

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
        return <h2>No Items here?</h2>;
    }

    return (
        <div id="my-playlists">
            <h2>
                <span className="highlight">
                    <b>Mixtape</b>:{" "}
                    <span className="playlist-name">{meta.title}</span>
                </span>
            </h2>
            <p className="description">by {meta.first}</p>
            <br></br>
            <p className="description">"{meta.description}"</p>
            <p className="description">
                published: &nbsp;
                {meta.created_at}
            </p>

            <div className="mixtape-view">
                {items.map((item, i) => {
                    i++;
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
                                <p className="item-meta">{item.type}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
