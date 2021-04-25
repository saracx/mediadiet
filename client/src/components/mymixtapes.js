import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";

export default function MyMixtapes() {
    const user = useSelector((state) => state && state.user);
    const [mixtapes, setMixtapes] = useState([]);
    const [error, setError] = useState("");

    console.log(user);

    useEffect(() => {
        user &&
            (async () => {
                try {
                    const { data } = await axios.get(
                        "/api/playlist/" + user.id
                    );
                    console.log("data at MyMixtapes in client", data);
                    if (data.success) {
                        setMixtapes(data.mixtapes);
                    } else {
                        setError("Sorry, something went wrong!");
                    }
                } catch (err) {
                    console.log("There was an error at mixtapes", err);
                }
            })();
    }, [user]);

    if (!mixtapes) {
        return (
            <h2>
                {user && user.first}, you haven't created a mixtape yet! Why
                don't you start?
            </h2>
        );
    } else console.log(user);

    return (
        <div id="my-playlists">
            <h2 className="welcome-landing">
                Hello {user && user.first} {user && user.id}
            </h2>

            {mixtapes &&
                mixtapes.map((tape, i) => {
                    console.log(tape);
                    return (
                        <div className="mixtape" key={tape.id}>
                            <details>
                                <summary>{tape.title}</summary>
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
