const express = require("express");
const router = express.Router();
const {
    addMixtape,
    getLastMixtapeDraft,
    addItems,
    getThisPlaylist,
    getAllMixtapesForThisUser,
    publishThisMixtape,
    queryPostItemDraft
} = require("../sql/db");
const { requireLoggedInUser } = require("../middleware/auth");

const playlistDraft = async (req, res) => {
    console.log("arrived at playlist draft");
    const { title, description } = req.body;
    const { userId } = req.session;

    try {
        const response = await addMixtape(title, description, userId);

        res.json({
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
        console.log("Error at get /getPlaylistDraft", err);
        return res.json({
            error: "There was an error at /getPlaylistDraft",
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

const publishMixtape = async (req, res) => {
    console.log("Arrived at publish Mixtape?");
    let id = req.params.id;
    try {
        const { rows } = await publishThisMixtape(id); // mixtape id, not user id!
        console.log("What's in rows?", rows);
        res.status(200).json({
            success: true,
            error: false,
            mixtape: rows[0],
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "We could not publish your playlist" });
    }
};

const getFinalMixtapes = async (req, res) => {
    console.log("Arrived at get Final Mixtapes for user", req.params.id);
    let id = req.params.id;
    try {
        const { rows } = await getAllMixtapesForThisUser(id);

        if (rows.length < 1) {
            return res.status(200).json({
                success: true,
                mixtapes: null,
                error: false,
            });
        }

        res.status(200).json({
            success: true,
            mixtapes: rows,
            error: false,
        });
    } catch (err) {
        console.log("Error in getFinalMixtapes", err);
        res.status(500).json({ error: "We could not retrieve your mixtapes" });
    }
};


const postItemDraft = async (req, res) => {
    const { mixtape_id, cleanedItem } = req.body;
    console.log("playlist id and item on server", mixtape_id, cleanedItem);
    let {type, title, image, url, year, author } = cleanedItem;

    const {rows} = await queryPostItemDraft(type, title, mixtape_id, image, url, year, author)

    // Insert into db with DRAFT = TRUE
    // return item id

    res.json({ success: true, item: rows[0] });
};

router.get("/:id", requireLoggedInUser, getFinalMixtapes);
router.post("/", requireLoggedInUser, playlistDraft);
router.get("/", requireLoggedInUser, getPlaylistDraft);
router.post("/items", requireLoggedInUser, postItems);
router.post("/itemDraft", requireLoggedInUser, postItemDraft);
router.post("/publish/:id", requireLoggedInUser, publishMixtape);

module.exports = router;
