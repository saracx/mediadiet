import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { randomBG } from "../utils";

import User from "./user"

export default function MyMixtapes() {
    const user = useSelector((state) => state && state.user);
    const [mixtapes, setMixtapes] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        user &&
            (async () => {
                try {
                    const { data } = await axios.get(
                        "/api/playlist/" + user.id
                    );

                    if (data.success && data.mixtapes) {
                        let unfiltered = data.mixtapes;
                        const drafts = unfiltered.filter((tape) => {
                            return tape.draft == true;
                        });
                        const published = unfiltered.filter((tape) => {
                            return tape.draft == false;
                        });
                        setMixtapes(published);
                        setDrafts(drafts);
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
    } else
        return (
            <div id="my-playlists">
            
                {user &&
            <User first={user.first}></User>}
                        <p className="intro">Check out  all your published and drafted mixtapes</p>

                <h3>Published</h3>
                <div className="mixtape-grid">
                    {mixtapes &&
                        mixtapes.map((tape, i) => {
                            return (
                                <div className={randomBG(1, 100)} key={tape.id}>
                                    <p className="mixtape mixtape-title2">
                                        <Link
                                            params={tape.id}
                                            to={{
                                                pathname: `/mixtape/${tape.id}`,
                                                mix_id: tape.id,
                                            }}
                                        >
                                            {tape.title}
                                        </Link>
                                    </p>
                                </div>
                            );
                        })}
                </div>
                <h3>Your drafts</h3>
                <div className="mixtape-grid">
                    {drafts
                        ? drafts.map((tape, i) => {
                              return (
                                  <div
                                      className={randomBG(1, 100)}
                                      key={tape.id}
                                  >
                                      <p className="mixtape mixtape-title2">
                                          <Link
                                              params={tape.id}
                                              to={{
                                                  pathname: `/mixtape/${tape.id}`,
                                                  mix_id: tape.id,
                                              }}
                                          >
                                              {tape.title}
                                          </Link>
                                      </p>
                                  </div>
                              );
                          })
                        : "No drafts yet!"}
                </div>
            </div>
        );
}
