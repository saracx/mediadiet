/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { receiveBooks, addNewBook } from "./actions";

export default function Library() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    let bookEmoji = "assets/book_emoji.png";

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

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
            <section id="find-people">
                <h2 className="subtitle">Add a book to your library</h2>
                <input
                    onChange={handleChange}
                    className="search-input"
                    name="search"
                ></input>
            </section>
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
