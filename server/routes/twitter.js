const express = require("express");
const router = express.Router();

const LoginWithTwitter = require("login-with-twitter");
const { requireLoggedOutUser } = require("../middleware/auth");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
    callbackUrl = "https://mediadiet.herokuapp.com/twitter/callback";
} else {
    secrets = require("../../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
    callbackUrl = "http://127.0.0.1:3000/twitter/callback";
}

const tw = new LoginWithTwitter({
    consumerKey: secrets.TWITTER_API,
    consumerSecret: secrets.TWITTER_SECRET,
    callbackUrl: callbackUrl,
});

const twLogin = async (req, res) => { 
    tw.login((err, tokenSecret, url) => {
        if (err) {
            console.log("error at login", err);
        }
        req.session.tokenSecret = tokenSecret;
        res.redirect(url);
    });
};

const twCallback = async (req, res) => { 
  tw.callback({
    oauth_token: req.query.oauth_token,
    oauth_verifier: req.query.oauth_verifier
  }, req.session.tokenSecret, (err, user) => {
    if (err) {
      // Handle the error your way
    }
    
    // Delete the tokenSecret securely
    delete req.session.tokenSecret
    
    // The user object contains 4 key/value pairs, which
    // you should store and use as you need, e.g. with your
    // own calls to Twitter's API, or a Twitter API module
    // like `twitter` or `twit`.
    // user = {
    //   userId,
    //   userName,
    //   userToken,
    //   userTokenSecret
    // }
    req.session.userId = user.userId
    req.session.first = user.userName
    
    // Redirect to whatever route that can handle your new Twitter login user details!
    res.redirect('/')
  });
};

router.get("/", twLogin);
router.get("/callback", twCallback);
router.get("/logout");

module.exports = router;
