import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
// import { cleanUpForPrinting } from "../utils";

export default function ThisMixtape() {
    const { id } = useParams();

    // const user = useSelector((state) => state && state.user);
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState([]);

    const [error, setError] = useState("");

    // console.log(user);

    useEffect(() => {
        // user &&
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
        return null;
    }

    return (
        <div id="my-playlists">
            <h2>
                Your playlist{" "}
                <span className="highlight">
                    {meta.title} ({items.length})
                </span>
            </h2>
            <p className="meta">
                <b>Description:</b>
                &nbsp;
                {meta.description} &nbsp;
                <b>Number of items:</b>
                &nbsp;
                {items.length}
            </p>

            <div className="mixtape-view">
                {items.map((item, i) => {
                    {
                        /* const cleanItem = cleanUpForPrinting(item); */
                    }

                    {
                        /* console.log("small Thumbnail", cleanItem.smallThumbnail); */
                    }

                    {
                        return (
                            <div key={item.i} className="item">
                                <a
                                    href={item.url || cleanItem.url}
                                    target="_blank"
                                >
                                    <img
                                        alt={item.title}
                                        className="small-image"
                                        src={item.image}
                                    ></img>
                                    <h4>{item.title}</h4>{" "}
                                </a>
                                <hr></hr>
                                <p className="item-meta">{item.year}</p>
                                <p className="item-meta">{item.type}</p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
