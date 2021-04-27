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
    }

    if (item.imdbID) {
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

    if (item.artist) {
        let cleanedUpItem = { ...item, image: item.Poster, title: item.Title };
        return cleanedUpItem;
    }
}

export function cleanUpResults(array) {
    let newArray = [];
    array.map((item) => {
        let Poster = item.album.images[0].url;
        let Title = item.name;
        let artist = item.artists[0];
        let type = "music";
        let url = item.external_urls.spotify;
        let year = item.album.release_date;
        newArray.push({ Title, Poster, artist, type, url, year });
    });


    return newArray;
}

export function randomBG(min, max) {
    let randomNumber = Math.round(Math.random() * (max - min) + min);

    if (randomNumber < 25) {
        return "mixtape mixtape1";
    }
    if (randomNumber < 50) {
        return "mixtape mixtape2";
    }
    if (randomNumber > 50 < 100) {
        return "mixtape mixtape3";
    }
}
