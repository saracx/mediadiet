import axios from "../axios";

export function bookRequests(query, abort, callback) {
    const BASE_URL =
        "https://www.googleapis.com/books/v1/volumes?q=" +
        query +
        "&printType=books";
    fetch(BASE_URL, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {
            let { items } = json;
            if (!abort) {
                const cleanedUp = items.map((item) => {
                    return {
                        ...item.volumeInfo,
                        Poster: item.volumeInfo.imageLinks,
                        Title: item.volumeInfo.title,
                    };
                });
                callback(cleanedUp);
            }
        })
        .catch((err) => console.log("err in book fetch", err));
}
