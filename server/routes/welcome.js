const path = require("path");
const express = require("express");
const { requireLoggedOutUser } = require("../middleware/auth");
const router = express.Router();

const welcome = async (req, res) => {
    res.sendFile(path.join(__dirname, "../..", "client", "index.html"));
};

router.get("/", requireLoggedOutUser, welcome);
module.exports = router;
