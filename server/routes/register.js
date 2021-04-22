const express = require("express");
const {
    requireLoggedOutUser,
    requireLoggedInUser,
} = require("../middleware/auth");

const router = express.Router();

const { addUser } = require("../sql/db");
const { hash } = require("../utils/bc");

const postRegister = async (req, res) => {
    console.log("in post Register");
    const { first, email, password } = req.body;

    try {
        let hashedPw = await hash(password);
        let results = await addUser(first, email, hashedPw);
        console.log("created id", results.rows[0]);
        let { id } = results.rows[0];
        req.session.userId = id;
        req.session.first = first;
        res.json({
            success: true,
            error: false,
            userId: id,
        });
    } catch (err) {
        if (err.routine === "_bt_check_unique") {
            res.json({
                error: "This email has already been registered",
            });
        } else {
            console.log("server side error in /register post route", err);
            res.json({
                success: false,
                error:
                    "There has been an error, but it's probably not your fault!",
            });
        }
    }
};

router.post("/", requireLoggedOutUser, postRegister);
module.exports = router;
