const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const auth = require('./auth.js');  // Import authentication logic
const tasks = require('./tasks.js');  // Import task-related routes
const notifications = require('./notifications.js');  // Import notification logic
const db = require('./config/database.js');  // Import database connection

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/tasks', tasks);  // Use the tasks routes
app.use('/notifications', notifications);  // Use the notifications routes
app.use(session({
    secret: '123456',   // Change this to a strong, unique secret
    resave: false,               // Avoid resaving session if not modified
    saveUninitialized: true,      // Save new sessions that have no data
    cookie: { maxAge: 90 * 60 * 1000 }  // Set session timeout (90 min)
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});


app.get('/tasks', (req, res) => {
    let sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    let { title, description } = req.body;
    let sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});