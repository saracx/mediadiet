export function cleanUp(item) {
    // console.log("arrived at cleanup, this is item", item);
    if (item.volumeInfo) {
        const {
            title,
            authors,
            imageLinks,
            infoLink,
            publishedDate,
        } = item.volumeInfo;

        let cleanedUpItem = {
            type: "book",
            title: title,
            author: authors[0],
            image: imageLinks.smallThumbnail,
            url: infoLink,
            year: publishedDate,
        };

        // console.log(cleanedUpItem);

        return cleanedUpItem;
    }
}
