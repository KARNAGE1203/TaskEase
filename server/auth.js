const bcrypt = require("bcrypt");
const express = require("express");
const db = require("./config/database.js");
const session = require("express-session");

const router = express.Router();

// Middleware for sessions
router.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 90 * 60 * 1000 }, // 90-minute session timeout
    })
);

// User Registration
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User registered successfully" });
    });
});

// User Login
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                req.session.user = { id: user.id, email: user.email };
                return res.json({ message: "Login successful" });
            }
        }
        res.status(401).json({ message: "Invalid credentials" });
    });
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
