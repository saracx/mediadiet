const spicedPG = require("spiced-pg");
// module required for node.js and postgres to communicate
const db = spicedPG(
    process.env.DATABASE_URL || "postgres:sara@localhost/mediadiet"
);

module.exports.addUser = function (first, email, password) {
    const query = `INSERT INTO users (first, email, password) VALUES ($1, $2, $3) RETURNING id, first;`;
    const params = [first, email, password];
    return db.query(query, params);
};

module.exports.loginUser = function (email) {
    const query = `SELECT * FROM users WHERE email = $1 `;
    const params = [email];
    return db.query(query, params);
};
//

module.exports.loginUserTwitter = function (token) {
    const query = `SELECT * FROM users WHERE email = $1 `;
    const params = [token];
    return db.query(query, params);
}

// Reset Code & Password Change

module.exports.addResetCode = function (email, code) {
    const query = `INSERT INTO reset (email, code) VALUES ($1, $2) RETURNING created_at`;
    const params = [email, code];
    return db.query(query, params);
};

module.exports.getResetCode = (email) => {
    const params = [email];
    const query = `
    SELECT * FROM reset
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1
    ORDER BY created_at DESC
    LIMIT 1;
    `;
    return db.query(query, params);
};

module.exports.changePassword = (password, email) => {
    const params = [password, email];
    const query = `
    UPDATE users
    SET password = $1
    WHERE email = $2;`;
    return db.query(query, params);
};

module.exports.userInfo = (id) => {
    const params = [id];
    const query = `
    SELECT id, first, last, profile_img, bio, city, twitter FROM users
    WHERE id = $1;`;
    return db.query(query, params);
};

module.exports.addProfilePicture = function (url, id) {
    const query = `UPDATE users
    SET profile_pic = $1
    WHERE id = $2
    RETURNING id, profile_pic;`;
    const params = [url, id];
    return db.query(query, params);
};

module.exports.addMixtape = function (title, desc, id) {
    const query = `
    INSERT INTO mixtapes
    (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`;
    const params = [title, desc, id];
    return db.query(query, params);
};

module.exports.getLastMixtapeDraft = function (id) {
    const query = `SELECT * FROM mixtapes
    WHERE user_id = $1 AND draft = true ORDER BY id DESC LIMIT 1;`;
    const params = [id];
    return db.query(query, params);
};

module.exports.addItems = function (type, title, id, image, url, year, author) {
    const query = `INSERT INTO items
    (type, title, mixtape_id, image, url, year, author) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const params = [type, title, id, image, url, year, author];
    return db.query(query, params);
};

module.exports.getThisPlaylist = function (id) {
    const query = `SELECT * FROM items WHERE mixtape_id = $1;`;
    const params = [id];
    return db.query(query, params);
};

module.exports.getAllUserMixtapes = function () {
    const query = `SELECT mixtapes.id AS mixtape_id, title, description, mixtapes.created_at, users.first AS name FROM mixtapes JOIN users ON mixtapes.user_id = users.id WHERE mixtapes.draft = false`;
    return db.query(query);
};

module.exports.publishThisMixtape = function (id) {
    const query = `UPDATE mixtapes
    SET draft = false
    WHERE id = $1 RETURNING *`;
    const params = [id];
    return db.query(query, params);
};

module.exports.getSingleMixtape = function (id) {
    const query = `SELECT * FROM items WHERE mixtape_id = $1`;
    const params = [id];
    return db.query(query, params);
};

module.exports.getMixtapeMeta = function (id) {
    const query = `SELECT * FROM mixtapes JOIN users ON users.id = mixtapes.user_id WHERE mixtapes.id = $1`;
    const params = [id];
    return db.query(query, params);
};

module.exports.getAllMixtapesForThisUser = function (id) {
    const query = `SELECT * FROM mixtapes WHERE user_id = $1`;
    const params = [id];
    return db.query(query, params);
};


module.exports.queryPostItemDraft = function (type, title, id, image, url, year, author) {
    const query = `INSERT INTO items
    (type, title, mixtape_id, image, url, year, author) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const params = [type, title, id, image, url, year, author];
    return db.query(query, params);
};
