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
