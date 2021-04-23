const { addProfilePicture, addImages } = require("../sql/db");
const { s3Url } = require("../config.json");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const uidSafe = require("uid-safe");
const { requireLoggedInUser } = require("../middleware/auth");
const s3 = require("../utils/s3.js");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve(__dirname, "../utils/uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploading = (req, res, next) => {
    const uploader = multer({
        storage: diskStorage,
        limits: {
            fileSize: 2097152,
        },
    }).single("file");

    // Changed the uploader to Multer middleware function in order to include error messages from Multer
    uploader(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ error: "File too large" });
        } else if (err) {
            return res.json({
                success: false,
                error: "Sorry something went wrong!",
            });
        }
        next();
    });
};

const postUpload = async (req, res) => {
    if (!req.file) {
        return res.json({ error: "Please attach a file before uploading" });
    }
    let id = req.session.userId;
    try {
        console.log(req.file.filename);
        let data = await addProfilePicture(s3Url + req.file.filename, id);
        let images = await addImages(id, s3Url + req.file.filename);
        res.json({ profile: data.rows[0] });
    } catch (err) {
        if (err instanceof multer.MulterError) {
            res.json({ error: "File Too Large" });
        } else if (err) {
            console.log("error in catch", err);
            res.send("Error", 500);
        }
    }
};

router.post("/", requireLoggedInUser, uploading, s3.upload, postUpload);

module.exports = router;
