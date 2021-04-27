const express = require("express");
const router = express.Router();
var request = require("request");
var postQuery = "grant_type=client_credentials";
// const { CLIENT_ID, CLIENT_SECRET } = require("../../secrets.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const getToken = async (req, res) => {
    const creds = `${secrets.CLIENT_ID}:${secrets.CLIENT_SECRET}`;
    const encodedCreds = btoa(creds);
    console.log("arrived at gettoken");

    request(
        {
            url: "https://accounts.spotify.com/api/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${encodedCreds}`,
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": postQuery.length,
            },
            body: postQuery,
        },
        function (error, response, data) {
            //send the access token back to client
            res.end(data);
        }
    );
};
router.get("/", getToken);
// router.get("/users/", requireLoggedInUser, findUsers);
// router.get("/users/:name", requireLoggedInUser, searchUsers);

module.exports = router;
