const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        UserModel.createUser(name, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully" });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    UserModel.getUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (match) {
                    req.session.user = { id: user.id, email: user.email };
                    res.json({ message: "Login successful" });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
};
