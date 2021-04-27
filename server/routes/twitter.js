const express = require("express");
const router = express.Router();

router.get("/");
router.get("/authenticate");
router.get("/authorize");
router.get("/callback");
router.get("/logout");

module.exports = router;
