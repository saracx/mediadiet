import { useState, useEffect } from "react";
import { addNewItem, deleteItem } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { cleanUp, cleanUpResults } from "../utils";
import axios from "../axios";

import { movieRequests } from "../requests/movies";
import { bookRequests } from "../requests/books";
import { spotifyRequest } from "../requests/spotify";

export default function Selector() {
    const noImage = "/no-results.png";
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state && state.playlist);
    const [option, setOption] = useState("");
    const [error, setError] = useState({});
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [garbage, setGarbage] = useState(false);

    // useEffect(() => {
    //     if (item) {
    //         setSelectedItem(item)
    //     }
    // }, []);

    // console.log(selectedItem)

   let mixtape_id = playlist.id;

    const handleChange = (e, task) => {
        if (task == "selection") {
            setOption(e.target.value);
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
        if (option == "music") {
            spotifyRequest(query, abort, (res) => {
                let cleanedRes = cleanUpResults(res);
                setResults(cleanedRes);
                
            });
        }
        return () => {
            abort = true;
        };
    }, [query]);

    const selectItem = async (item) => {
        // clean up selected item object before sending it to local and global state
        let cleanedItem = cleanUp(item);
        // console.log("cleaned Item", cleanedItem);
        dispatch(addNewItem(cleanedItem)); 

         const { data } = await axios.post("/api/playlist/itemDraft", { mixtape_id, cleanedItem });
    
        setSelectedItem(data.item)
        setQuery(null); // close results window
        setGarbage(true);
        setOption("");
    };

    // draft considerations: store all selected items in db.
    // in startselector, get last playlist draft, make db query to items and return an array of items (rows)
    // then pass the items as props to the selectors by mapping over them and creating a selector for each item

    const handleDeleteItem = () => {
        console.log("selected Item?", selectedItem)
        setQuery(null);
        setGarbage(false);
        dispatch(deleteItem(selectedItem)).then(() => {
            setSelectedItem(null);
            setOption(true);
        });
    };

    return (
        <div className="select-form">
            {!garbage && !selectedItem ? (
                <select
                    onChange={(e) => handleChange(e, "selection")}
                    placeholder="Make a selection"
                    defaultValue="1"
                >
                    <option value="1" disabled>
                        Choose media
                    </option>

                    <option>books</option>
                    <option>movies</option>
                    <option>music</option>
                </select>
            ) : (
                <p className="selected-item">
                    {selectedItem.title.substring(0, 50)}
                </p>
            )}

            <div className="search-list">
                {option && (
                    <input
                        onChange={(e) => handleChange(e, "search")}
                        placeholder={
                            selectedItem && query
                                ? selectedItem.title
                                : "Search"
                        }
                    ></input>
                )}
                {garbage && selectedItem ? 
                    <>
                        <img
                            className="preview-image"
                            src={selectedItem.image || noImage}
                        ></img> 
                        
                    </>
                : 
                    ""
                }

                <ul>
                    {results && query
                        ? results.map((item, i) => {
                              while (i < 4) {
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
                                          {item.Title.substring(0, 50)}
                                      </li>
                                  );
                              }
                          })
                        : ""}
                </ul>
            </div>
            {garbage && selectedItem ? (
                <p className="garbage" onClick={() => handleDeleteItem()}>
                    🚮
                </p>
            ) : (
                <p className="garbage">🚨</p>
            )}
        </div>
    );
}
