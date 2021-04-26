import axios from "../axios";

export function spotifyRequest(query, abort, callback) {
    const CLIENT_ID = "2791591419614dfc8a6d0f0d28c9063c";
    const CLIENT_SECRET = "2696c842efc64343aee933784e43ab94";

    const creds = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCreds = btoa(creds);

    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    };

    axios.get("/getToken").then(({ data }) => {
        console.log(data);
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
                    console.log("response in spotify", response);
                    let res = response.data.tracks.items;
                    callback(res);
                }
            })
            .catch(function (error) {
                console.error("catch in spotify search", error);
            });
    });
}
