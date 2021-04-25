export function cleanUp(item) {
    if (item.printType) {
        const { Title, authors, Poster, infoLink, publishedDate } = item;

        let cleanedUpItem = {
            type: "book",
            title: Title,
            author: authors[0],
            image: Poster.smallThumbnail,
            url: infoLink,
            year: publishedDate,
        };

        return cleanedUpItem;
    } else {
        const { Title, Year, imdbID, Poster } = item;

        let cleanedUpItem = {
            type: "movie",
            title: Title,
            url: "http://www.imdb.com/title/" + imdbID,
            year: Year,
            image: Poster,
        };
        return cleanedUpItem;
    }
}

// export function cleanUpForPrinting(item) {
//     if (item.type == "book") {
//         let newItem = JSON.parse(item.image);
//         return newItem;
//     }
//     if (item.type == "movie") {
//         let url = item.url;
//         let newItem = `http://www.imdb.com/${url}`;
//         return newItem;
//     } else return item;
// }
