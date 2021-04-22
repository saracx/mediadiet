const express = require("express");
const { requireLoggedOutUser } = require("../middleware/auth");
const router = express.Router();
const { loginUser } = require("../sql/db");
const { compare } = require("../utils/bc");

const postLogin = async (req, res) => {
    const { email } = req.body;

    try {
        const results = await loginUser(email);
        if (results.rows < 1) {
            console.log("The user is not registered yet");
            return res.json({
                error: "This email is not registered yet",
            });
        } else {
            const { password } = results.rows[0];
            const match = await compare(req.body.password, password);

            if (match) {
                const { id, first } = results.rows[0];
                req.session.userId = id;
                req.session.first = first;
                res.json({
                    success: true,
                    userId: id,
                    error: false,
                });
            } else {
                return res.json({
                    error: "User or password incorrect",
                });
            }
        }
    } catch (err) {
        console.log("Error at login", err);
        return res.json({
            error: "User or password incorrect",
        });
    }
};

router.post("/", requireLoggedOutUser, postLogin);

module.exports = router;
