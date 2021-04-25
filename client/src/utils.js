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

export function randomBG(min, max) {
    let randomNumber = Math.round(Math.random() * (max - min) + min);
    console.log("randomnumber", randomNumber);
    if (randomNumber < 25) {
        return "mixtape1";
    }
    if (randomNumber < 50) {
        return "mixtape2";
    }
    if (randomNumber > 50 < 100) {
        console.log("at mixtape3");
        return "mixtape3";
    }
}
