import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
// import { cleanUpForPrinting } from "../utils";

export default function ThisMixtape({ first }) {
    console.log(first);
    const { id } = useParams();
    console.log("params", id);
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState([]);

    console.log("meta", meta);

    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/mixtape/" + id);
                console.log("data in ThisMixtape", data);
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
                    <b>Mixtape</b>: {meta.title} ({items.length})
                </span>
            </h2>
            <p className="description">by {meta.first}</p>
            <p className="description">{meta.description}</p>

            <div className="mixtape-view">
                {items.map((item, i) => {
                    return (
                        <div key={item.i} className="item">
                            <img
                                alt={item.title}
                                className="small-image"
                                src={item.image}
                            ></img>

                            <div className="item-info">
                                <a
                                    href={item.url || cleanItem.url}
                                    target="_blank"
                                >
                                    <h4>
                                        👉 {item.i}
                                        {item.title}
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
