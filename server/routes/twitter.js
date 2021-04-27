const express = require("express");
 const router = express.Router();

 const LoginWithTwitter = require("login-with-twitter");
 const { requireLoggedOutUser } = require("../middleware/auth");
const { addUser, loginUserTwitter } = require("../sql/db");

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

     console.log(user)

     // Delete the tokenSecret securely
     delete req.session.tokenSecret
     const {userId, userName, userToken, userTokenSecret } = user;

        // req.session.userId = userId
        // req.session.first = userName

     addUser(userName, userToken, userTokenSecret).then((data) => {
 
        req.session.userId = data.rows[0].id
        req.session.first = data.rows[0].first
        res.redirect('/')
        
     }).catch((err) => {
         console.log("already registered, so just getting info and redirecting")
        
        if (err.routine === "_bt_check_unique") {
            loginUserTwitter(userToken).then((data) => {
                console.log(data)
                req.session.userId = data.rows[0].id
                req.session.first = data.rows[0].first
                res.redirect('/')
            })
            
        } else {
            console.log("server side error in /register post route", err);
            res.json({
                success: false,
                error:
                    "There has been an error, but it's probably not your fault!",
            });
        }
    })
    
    // res.redirect('/') // Redirect to whatever route that can handle your new Twitter login user details!
     
   }); // close callback
 };

 router.get("/", twLogin);
 router.get("/callback", twCallback);
 router.get("/logout");

 module.exports = router;