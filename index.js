const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./server/routes/authRoutes");
const taskRoutes = require("./server/routes/taskRoutes");
const db = require("./server/config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 90 * 60 * 1000 },
    })
);

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Serve Views
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views/index.html")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
