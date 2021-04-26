import axios from "../axios";
export function spotifyRequest(query, abort, callback) {
    var options = {
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10&offset=5`,
        headers: {
            Authorization:
                "Bearer BQAdhtGy8x-ertXK3FfvWpAsGmHTUL6ZHnTNjToYrvFScM4l0oZXp32OptOzHuvCFrlsadPpnnSgKX9SEZohGn6kptoJueCEwdcSTVJUufriPtRvapwXgAER4VU4cDUOvmgElqUr-MLq",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    axios
        .request(options)
        .then(function (response) {
            if (!abort) {
                let res = response.data.tracks.items;
                callback(res);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}
