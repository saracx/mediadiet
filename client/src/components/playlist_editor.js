/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/playlists.css";
import { addPlaylist } from "../redux/actions";
import Startcreator from "./startcreator";
import Selectcreator from "./selectcreator";
import { HashRouter, Route } from "react-router-dom";

export default function Playlisteditor() {
    // const dispatch = useDispatch();
    // // const playlist = useSelector((state) => state && state.playlist);

    // const [input, setInput] = useState({});
    // const [error, setError] = useState(false);

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setInput((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    //     setError(false);
    // };

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     dispatch(addPlaylist(input));
    //     // then go on to next part of the form
    //     setError(false);
    // };

    // useEffect(() => {
    //     let abort;
    //     const BASE_URL =
    //         "https://www.googleapis.com/books/v1/volumes?q=" +
    //         query +
    //         "&printType=books";
    //     fetch(BASE_URL, { method: "GET" })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             let { items } = json;
    //             if (!abort) {
    //                 setBooks(items);
    //                 console.log(bookArray);
    //             }
    //         })
    //         .catch((err) => console.log("err in gFetch", err));
    //     return () => {
    //         abort = true;
    //     };
    // }, [query]);

    // const handleClick = async (id) => {
    //     let cover = id.volumeInfo.imageLinks.smallThumbnail || bookEmoji;
    //     let name = id.volumeInfo.title;
    //     dispatch(addNewBook(name, cover));
    // };

    // useEffect(() => {
    //     !books && dispatch(receiveBooks());
    // }, [books]);

    // if (!books) {
    //     return null;
    // }
    // console.log("books in lib", books);

    return (
        <div id="playlist-editor">
            <h2>Create a playlist</h2>
            <HashRouter>
                <Route exact path="/" component={Startcreator} />
                <Route path="/select" component={Selectcreator} />
                {/* <Route path="/finish" component={Finishcreator} /> */}
            </HashRouter>
        </div>
    );
}

// book.volumeInfo.imageLinks.smallThumbnail
//   <section id="results">
//       {bookArray && query
//           ? bookArray.map((book) => {
//                 {
//                     /* console.log(book.volumeInfo); */
//                 }
//                 return (
//                     <div className="book-search" key={book.id}>
//                         <img
//                             src={
//                                 book.volumeInfo.imageLinks
//                                     ? book.volumeInfo.imageLinks.smallThumbnail
//                                     : bookEmoji
//                             }
//                         ></img>
//                         <h2>{book.volumeInfo.title}</h2>
//                         <h3>
//                             <b>{book.volumeInfo.authors}</b>
//                         </h3>
//                         <button onClick={() => handleClick(book)}>
//                             Add Book
//                         </button>
//                     </div>
//                 );
//             })
//           : "There are no results to show"}
//   </section>;
