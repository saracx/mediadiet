const express = require("express");
const { requireLoggedOutUser } = require("../middleware/auth");
const router = express.Router();
const {
    loginUser,
    addResetCode,
    getResetCode,
    changePassword,
} = require("../sql/db");

const { sendEmail } = require("../utils/ses");
const { hash } = require("../utils/bc");
const cryptoRandomString = require("crypto-random-string");

const postResetStart = async (req, res) => {
    const { email } = req.body;
    try {
        const results = await loginUser(email);
        if (results.rows < 1) {
            console.log("This email has not been registered");
            return res.json({
                error: "This email is not registered yet. Please sign up!",
            });
        } else {
            // the user is registered
            // generate random code
            const { first } = results.rows[0];
            const secretCode = cryptoRandomString({
                length: 6,
            });

            try {
                const { rows } = await addResetCode(email, secretCode);
                let time = rows[0].created_at.toLocaleString();
                console.log("Added code successfully to db", time);
                // Generate email body - can be done somewhere else
                const subject = "Reset your password at BOOK CLUB";
                const body = `
                    Hello ${first}, you asked to reset your password on ${time}. 
                    Your unique reset code is: ${secretCode}.
                    Please use this code to reset your password on the website.`;
                // Send email
                await sendEmail(email, body, subject);
                console.log("Email should be sent");
                res.json({
                    error: false,
                    success: true,
                });
            } catch (err) {
                console.log("error addResetCode", err);
                res.json({
                    error: "There was an error!",
                    success: false,
                });
            }
        }
    } catch (err) {
        console.log("Server error at password reset", err);
    }
};

const postResetVerify = async (req, res) => {
    const { email, code, password } = req.body;
    try {
        const { rows } = await getResetCode(email);
        if (rows[0].code != code) {
            res.json({ error: "This is not the correct code" });
        } else {
            // if it's a match, hash the new pw and return success

            hash(password).then((hash) => {
                changePassword(hash, email).then(() => {
                    console.log("password was changed");
                    res.json({ success: true, error: false });
                });
            });
        }
    } catch (err) {
        console.log("error in verification", err);
        res.json({
            error: "There was an error!",
            success: false,
        });
    }
};

router.post("/start", requireLoggedOutUser, postResetStart);
router.post("/verify", requireLoggedOutUser, postResetVerify);
module.exports = router;
