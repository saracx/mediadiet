const express = require("express");
const router = express.Router();
const { addMixtape, getLastMixtapeDraft, addItems } = require("../sql/db");
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

const postItems = async (req, res, next) => {
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
        ).then(({ rows }) => {
            console.log("rows added", rows);
            asyncStuff(rows)
            next();
        });
    });
    
    function asyncStuff(rows) {
        console.log("arrived at asyncStuff")
        res.status(200).json({ success: true, rows });
    }
     
    // // const inserted = items.map(async (item) => {
    // //     const { rows } = await addItems(
    // //         item.type,
    // //         item.title,
    // //         id,
    // //         item.image,
    // //         item.url,
    // //         item.year,
    // //         item.author
    // //     );
    // // });

    // res.json(
    //     items.map(async (item) => {
    //         const { rows } = await addItems(
    //             item.type,
    //             item.title,
    //             id,
    //             item.image,
    //             item.url,
    //             item.year,
    //             item.author
    //         );
    //     })
    // );
};

router.post("/", requireLoggedInUser, playlistDraft);
router.get("/", requireLoggedInUser, getPlaylists);
router.post("/items", requireLoggedInUser, postItems);

// router.get("/users/", requireLoggedInUser, findUsers);
// router.get("/users/:name", requireLoggedInUser, searchUsers);

module.exports = router;
