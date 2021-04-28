export function cleanUp(item) {
    if (item.printType) {
        const { Title, authors, Poster, infoLink, publishedDate } = item;
        console.log("book in util", item)
        let cleanedUpItem = {
            type: "book",
            title: Title,
            author: authors[0],
            image: Poster.smallThumbnail,
            url: infoLink,
            year: publishedDate,
            description: item.description,
            subtitle: item.subtitle
        };
        return cleanedUpItem;
    }

    if (item.imdbID) {
        const { Title, Year, imdbID, Poster } = item;
        console.log("movie in util", item)

        let cleanedUpItem = {
            type: "movie",
            title: Title,
            url: "http://www.imdb.com/title/" + imdbID,
            year: Year,
            image: Poster,
            description: null,
            subtitle: null,
            author: null,
        };
        return cleanedUpItem;
    }

    if (item.artist) {
        console.log("song in util", item)
        let cleanedUpItem = { ...item, image: item.Poster, title: item.Title, author: item.artist.name, subtitle: null, description: null };
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
