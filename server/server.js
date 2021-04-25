const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const csurf = require("csurf");
const {
    requireLoggedInUser,
    requireLoggedOutUser,
} = require("./middleware/auth");

// ===== ROUTE FILES ==== //

const register = require("./routes/register");
const login = require("./routes/login");
// const password = require("./routes/pwreset");
const welcome = require("./routes/welcome");
const userRouter = require("./routes/user");
const playlistRouter = require("./routes/playlist");
const mixtapeRouter = require("./routes/mixtape");
// const upload = require("./routes/upload");
// const bio = require("./routes/bio");
// const otherUser = require("./routes/getotherusers.js");
// const relationRouter = require("./routes/friendship.js");
// const deleteUser = require("./routes/delete.js");
// const imageRouter = require("./routes/images.js");
// const libraryRouter = require("./routes/library.js");

// ===== MIDDLEWARE ==== //
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());
// parse JSON text

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET || `testtesttesteststest`,
        maxAge: process.env.COOKIE_MAX || `14*20*20*20`,
        // sets expiration date miliseconds x seconds x minutes x hours x days
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.header("x-frame-options", "DENY");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

// // ===== ROUTES ==== //

app.use("/signup", register);
// app.use("/delete", deleteUser);
app.use("/login", login);
// app.use("/password/reset", password);
app.use("/welcome", welcome);
// app.use("/upload", upload);
// app.use("/bio", bio);
// app.use(otherUser);
app.use("/api/user", userRouter);
app.use("/api/playlist", playlistRouter); // generates the playlist, has to be renamed; renders playlist titles
app.use("/api/mixtape", mixtapeRouter); // shows the single playlist and its items
// app.use("/relationship", relationRouter);
// app.use("/images", imageRouter);
// app.use("/library", libraryRouter);

//Logout Route
app.get("/api/logout", (req, res) => {
    console.log("Arrived at logout ");
    req.session = null;
    res.json({ success: true });
});

app.get("*", requireLoggedInUser, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    let date = new Date();
    console.log("Hit the star route!", date.toLocaleString());
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
