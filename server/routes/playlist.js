const express = require("express");
const router = express.Router();
const { addMixtape, getLastMixtapeDraft } = require("../sql/db");
const { requireLoggedInUser } = require("../middleware/auth");

const playlistDraft = async (req, res) => {
    console.log("arrived at playlist draft");
    const { title, description } = req.body;
    const { userId } = req.session;
    try {
        const response = await addMixtape(title, description, userId);
        res.status(200).json({
            success: true,
            playlist: response.rows[0],
            error: false,
        });
    } catch (err) {
        console.log("Error at get /postPlaylist", err);
        return res.json({
            error: "There was an error at post/Playlist",
        });
    }
};

const getPlaylists = async (req, res) => {
    console.log("arrived at GET playlist draft");
    const { userId } = req.session;
    try {
        const response = await getLastMixtapeDraft(userId);
        res.status(200).json({
            success: true,
            playlist: response.rows[0],
            error: false,
        });
    } catch (err) {
        console.log("Error at get /postPlaylist", err);
        return res.json({
            error: "There was an error at post/Playlist",
        });
    }
};

router.post("/", requireLoggedInUser, playlistDraft);
router.get("/", requireLoggedInUser, getPlaylists);

// router.get("/users/", requireLoggedInUser, findUsers);
// router.get("/users/:name", requireLoggedInUser, searchUsers);

module.exports = router;
