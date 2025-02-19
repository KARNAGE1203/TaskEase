const db = require("../config/db");

// Create a new user
exports.createUser = (name, email, hashedPassword, callback) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], callback);
};

// Find a user by email
exports.getUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
};
