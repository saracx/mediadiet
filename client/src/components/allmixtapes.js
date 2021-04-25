import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { randomBG } from "../utils";

export default function AllMixtapes() {
    const user = useSelector((state) => state && state.user);
    const [allMixtapes, setAllMixtapes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        user &&
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
    }, [user]);

    if (!allMixtapes) {
        return (
            <h2>
                {user && user.first}, There are no mixtapes here yet! Why don't
                you create the first?
            </h2>
        );
    } else
        return (
            <div id="my-playlists">
                <h2 className="welcome-landing">All published playlists</h2>

                <div className={randomBG(1, 100)}>
                    <p className="mixtape-title2">Short Title</p>
                </div>

                <div className={randomBG(1, 100)}>
                    <p className="mixtape-title2">
                        SUPER COOL MIXTAPE WITH A LONG ASSSSSS{" "}
                    </p>
                </div>
                <div className={randomBG(1, 100)}>
                    <p className="mixtape-title2">
                        SUPER COOL MIXTAPE WITH A LONG ASSSSSS{" "}
                    </p>
                </div>

                {allMixtapes &&
                    allMixtapes.map((tape, i) => {
                        console.log(tape);
                        return (
                            <div
                                className="mixtape"
                                id={tape.id}
                                key={"mixtapes0x0x0" + tape.id}
                            >
                                <details>
                                    <summary>
                                        <Link
                                            params={tape.id}
                                            to={{
                                                pathname: `/mixtape/${tape.id}`,
                                                mix_id: tape.id,
                                            }}
                                        >
                                            {" "}
                                            {tape.title}
                                        </Link>
                                    </summary>
                                    {tape.description}
                                    <br></br>
                                    {tape.created_at.toLocaleString()}
                                </details>
                            </div>
                        );
                    })}
            </div>
        );
}
