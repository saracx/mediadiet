import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { randomBG } from "../utils";

export default function AllMixtapes({ title }) {
    const user = useSelector((state) => state && state.user);
    const [allMixtapes, setAllMixtapes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        
            (async () => {
                try {
                    const { data } = await axios.get("/api/mixtape/all");
                    console.log("data at AllMixtapes in client", data);
                    setAllMixtapes(data.mixtapes);
                    setError("Sorry, something went wrong!");
                } catch (err) {
                    console.log("There was an error at mixtapes", err);
                }
            })();
    }, []);

    if (!allMixtapes && user) {
        return (
            <h2>
                {user && user.first}, There are no mixtapes here yet! Why don't
                you create the first?
            </h2>
        );
    } else
        return (
            <div id="all-playlists">
                {title ? (
                    <h2>{title}</h2>
                ) : (
                    <h2 className="welcome-landing">All MIXTAPES</h2>
                )}

                <div className="mixtape-grid">
                    {allMixtapes &&
                        allMixtapes.map((tape, i) => {
                            return (
                                <div
                                    key={tape.mixtape_id}
                                    className={randomBG(1, 100)}
                                >
                                    <p className="mixtape-title2">
                                        <Link
                                            to={{
                                                pathname: `/mixtape/${tape.mixtape_id}`,
                                            }}
                                        >
                                            {tape.title}
                                        </Link>
                                    </p>
                                    <div className="name-sticker">
                                        <span>by {tape.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
}
