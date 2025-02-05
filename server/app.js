const express = require("express");
const path = require("path");
const db = require("./config/database.js");
const authRoutes = require("./auth.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', require('./auth'));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Use authentication routes
app.use("/auth", authRoutes);

// Serve HTML pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
