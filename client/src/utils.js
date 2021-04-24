export function cleanUp(item) {
    if (item.printType) {
        const { Title, authors, Poster, infoLink, publishedDate } = item;

        let cleanedUpItem = {
            type: "book",
            title: Title,
            author: authors[0],
            image: Poster,
            url: infoLink,
            year: publishedDate,
        };

        return cleanedUpItem;
    } else {
        const { Title, Year, imdbID, Poster } = item;

        let cleanedUpItem = {
            type: "movie",
            title: Title,
            url: imdbID,
            year: Year,
            image: Poster,
        };
        return cleanedUpItem;
    }
}
