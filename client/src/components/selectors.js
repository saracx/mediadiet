import { useState, useEffect } from "react";
import { receivePlaylistDraft } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { cleanUp } from "../utils";

import { movieRequests } from "../requests/movies";
import { bookRequests } from "../requests/books";

export default function Selector() {
    const noImage = "/no-results.png";
    const dispatch = useDispatch();
    // const items = useSelector((state) => state && state.items);
    const [option, setOption] = useState("");
    const [error, setError] = useState({});
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    // console.log("this should be a new playlist with the new item", items);

    const handleChange = (e, task) => {
        if (task == "selection") {
            setOption(e.target.value);
            // setOption(e.currentTarget.value);
            setError(false);
        }
        if (task == "search") {
            setQuery(e.target.value);
        }
    };

    useEffect(() => {
        let abort;
        if (option == "movies") {
            movieRequests(query, abort, (res) => {
                setResults(res);
            });
        }
        if (option == "books") {
            bookRequests(query, abort, (res) => {
                setResults(res);
            });
        }
        return () => {
            abort = true;
        };
    }, [query]);

    const selectItem = (item) => {
        console.log("item in selectItem", item);
        setQuery(null);

        dispatch(receivePlaylistDraft(cleanUp(item)));
    };

    return (
        <div className="select-form">
            <select
                onChange={(e) => handleChange(e, "selection")}
                placeholder="Make a selection"
                defaultValue="1"
            >
                <option value="1" disabled>
                    Choose here
                </option>

                <option>books</option>
                <option>movies</option>
            </select>
            <div className="search-list">
                {option && (
                    <input
                        onChange={(e) => handleChange(e, "search")}
                        placeholder="Search"
                    ></input>
                )}
                <ul>
                    {results && query
                        ? results.map((item, i) => {
                              while (i < 3) {
                                  return (
                                      <li
                                          onClick={(e) => selectItem(item)}
                                          key={item.id || i}
                                      >
                                          <img
                                              className="small"
                                              src={
                                                  item.Poster
                                                      ? item.Poster
                                                            .smallThumbnail ||
                                                        item.Poster
                                                      : noImage
                                              }
                                          ></img>
                                          {item.Title}
                                      </li>
                                  );
                              }
                          })
                        : ""}
                </ul>
            </div>
        </div>
    );
}

{
    // <b>{item.volumeInfo.authors}</b>;
    /* <img
    src={
        item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.smallThumbnail
            : bookEmoji
    }
></img>; */
}
