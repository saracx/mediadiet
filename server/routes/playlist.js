const express = require("express");
const router = express.Router();
const {
    addMixtape,
    getLastMixtapeDraft,
    addItems,
    getThisPlaylist,
} = require("../sql/db");
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

const getPlaylistDraft = async (req, res) => {
    // console.log("arrived at GET playlist draft");
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

const postItems = async (req, res) => {
    const { userId } = req.session;
    const { id, items } = req.body;
    console.log("id and items on server", id, items);

    items.forEach((item) => {
        addItems(
            item.type,
            item.title,
            id,
            item.image,
            item.url,
            item.year,
            item.author
        ).then((response) => {
            console.log("successfully added items,", response.rows);
        });
    });

    res.json({ success: true });
};

const getPlaylist = (req, res) => {
    console.log("Arrived at getPlaylist");
    console.log(req.params.id);

    getThisPlaylist(req.params.userId)
        .then(({ rows }) => {
            console.log(rows);
        })
        .catch((err) => console.log(err));
    //     res.status(200).json({
    //         success: true,
    //         playlist: response.rows,
    //         error: false,
    //     });
    // //     console.log("response in getThisPlaylist", response);
    // // } catch (err) {
    // //     console.log("Error at get /getThisPlaylist", err);
    // //     return res.json({
    // //         error: "There was an error at getThisPlaylist",
    //     });
    // }
};

router.get("/:id", requireLoggedInUser, getPlaylist);
router.post("/", requireLoggedInUser, playlistDraft);
router.get("/", requireLoggedInUser, getPlaylistDraft);
router.post("/items", requireLoggedInUser, postItems);

// router.get("/users/", requireLoggedInUser, findUsers);
// router.get("/users/:name", requireLoggedInUser, searchUsers);

module.exports = router;
