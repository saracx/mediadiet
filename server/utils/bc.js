const { genSalt, hash, compare } = require("bcryptjs");

// compare will compare password that the user types in with the has in our db
module.exports.compare = compare;

module.exports.hash = (password) => {
    return genSalt().then((salt) => hash(password, salt));
};
// hash calls genSalt first, then it hashes the password from the user, using the salt and the hash method.
