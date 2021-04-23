import { useState, useEffect } from "react";
import { receivePlaylistDraft } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { cleanUp } from "../utils";

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
            console.log("the movie query goes here");
        }
        if (option == "books") {
            const BASE_URL =
                "https://www.googleapis.com/books/v1/volumes?q=" +
                query +
                "&printType=books";
            fetch(BASE_URL, { method: "GET" })
                .then((response) => response.json())
                .then((json) => {
                    let { items } = json;
                    if (!abort) {
                        console.log(items);
                        setResults(items);
                    }
                })
                .catch((err) => console.log("err in book fetch", err));
        }
        return () => {
            abort = true;
        };
    }, [query]);

    const selectItem = (item) => {
        // setSelectedItems(cleanUp(item));

        setQuery(null);

        dispatch(receivePlaylistDraft(cleanUp(item)));
    };

    return (
        <div className="select-form">
            <div>Item 1*</div>
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
                                          key={item.id}
                                      >
                                          <img
                                              className="small"
                                              src={
                                                  item.volumeInfo.imageLinks
                                                      ? item.volumeInfo
                                                            .imageLinks
                                                            .smallThumbnail
                                                      : noImage
                                              }
                                          ></img>
                                          {item.volumeInfo.title}
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
