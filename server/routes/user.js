const express = require("express");
const router = express.Router();
const { userInfo, getRecentUsers, getUserByName } = require("../sql/db");
const { requireLoggedInUser } = require("../middleware/auth");

const getUser = async (req, res) => {
    const { userId } = req.session;
    try {
        const response = await userInfo(userId);
        res.status(200).json({
            success: true,
            user: response.rows[0],
            error: false,
        });
    } catch (err) {
        console.log("Error at get /getuser", err);
        return res.json({
            error: "This user does not have any data",
        });
    }
};

const findUsers = async (req, res) => {
    console.log("Arrived at findUser");
    try {
        const response = await getRecentUsers();
        res.status(200).json({
            success: true,
            user: response.rows,
            error: false,
        });
    } catch (err) {
        console.log("Error at get /user", err);
        return res.json({
            error: "This user does not have any data",
        });
    }
};

const searchUsers = async (req, res) => {
    console.log("Arrived at searchUser");
    let val = req.params.name;
    try {
        const response = await getUserByName(val);
        res.status(200).json({ success: true, user: response.rows });
    } catch (err) {
        console.log("Error at get /user", err);
        return res.json({
            error: "This user does not have any data",
        });
    }
};

router.get("/user", requireLoggedInUser, getUser);
router.get("/users/", requireLoggedInUser, findUsers);
router.get("/users/:name", requireLoggedInUser, searchUsers);

module.exports = router;
