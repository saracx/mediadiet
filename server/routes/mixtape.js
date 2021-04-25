const express = require("express");
const router = express.Router();
const {
    getSingleMixtape,
    getMixtapeMeta,
    getAllUserMixtapes,
} = require("../sql/db");
const { requireLoggedInUser } = require("../middleware/auth");

const getThisMixtape = async (req, res) => {
    console.log("Arrived at Get This Mixtape", req.params.id);
    let id = req.params.id;
    try {
        const { rows } = await getSingleMixtape(id);
        const metaData = await getMixtapeMeta(id);

        console.log(rows);

        res.status(200).json({
            success: true,
            mixtape: rows,
            meta: metaData,
            error: false,
        });
    } catch (err) {
        console.log("Error in getSingleMixtapes", err);
        res.status(500).json({ error: "We could not retrieve your mixtapes" });
    }
};

const getAllMixtapes = async (req, res) => {
    console.log("Arrived at get all mixtapes");
    try {
        const { rows } = await getAllUserMixtapes();
        console.log(rows);
        res.status(200).json({
            success: true,
            mixtapes: rows,
            error: false,
        });
    } catch (err) {
        console.log("error at getAllMixtapes", err);
        res.status(500).json({ error: "We could not retrieve your mixtapes" });
    }
};

router.get("/all", requireLoggedInUser, getAllMixtapes);
router.get("/:id", requireLoggedInUser, getThisMixtape);

module.exports = router;
