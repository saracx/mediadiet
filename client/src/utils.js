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
        console.log("returning movie item unclean");
        return item;
    }
}
