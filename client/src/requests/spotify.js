import axios from "../axios";

export function spotifyRequest(query, abort, callback) {
    

    axios.get("/getToken").then(({ data }) => {
       
        var token = data.access_token;
        var options = {
            method: "GET",
            url: `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10&offset=5`,
            headers: {
                Authorization: "Bearer " + token,
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
                console.error("catch in spotify search", error);
            });
    });
}
