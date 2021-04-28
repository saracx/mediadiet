const express = require("express");
const router = express.Router();

const {
    addLike, getLikes
} = require("../sql/db");

const { requireLoggedInUser } = require("../middleware/auth");


const addLikeToMixtape = async (req, res) => {
    
    const { mixtape_id, user_id } = req.params;
    console.log("arrived at add like to mixtape", "mix-id", mixtape_id, "user_id", user_id);

    try {
        const response = await addLike(mixtape_id, user_id);
        res.json({
            success: true,
        });
    } catch (err) {
        console.log("Error at get /addLike", err);
        return res.json({
            error: "There was an error at addLike",
        });
    }
};

const getLikesForMixtape = async (req, res) => {
    
    const { mixtape_id} = req.params;
    console.log("getting likes for this mix", "mix-id", mixtape_id);

    try {
        const {rows} = await getLikes(mixtape_id);
        res.json({
            success: true,
            rows
        });
    } catch (err) {
        console.log("Error at get /addLike", err);
        return res.json({
            error: "There was an error at addLike",
        });
    }
};

router.post("/add/:mixtape_id/:user_id", addLikeToMixtape);
router.get("/:mixtape_id", getLikesForMixtape);

module.exports = router;