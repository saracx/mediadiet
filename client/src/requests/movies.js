import axios from "../axios";

export function movieRequests(query, abort, callback) {
    var options = {
        method: "GET",
        url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
        params: { s: query, page: "1", r: "json" },
        headers: {
            "x-rapidapi-key":
                "bde7a68994msh644e91bc649b824p13d43ejsn5a05613a961b",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        },
    };

    axios
        .request(options)
        .then(function (response) {
            if (!abort) {
                // console.log("response data", response.data.Search);
                let res = response.data.Search;
                callback(res);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}
