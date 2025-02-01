const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();

// Database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'taskease_db'
});

db.connect((err) => {
    if (err) {
        console.log('Database Connection Failed', err);
    } else {
        console.log('Database Connected');
    }
});

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html/index.html'));
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

app.delete('/tasks/:id', (req, res) => {
    let sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.put('/tasks/:id', (req, res) => {
    const { title, description } = req.body;
    let sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    
    db.query(sql, [title, description, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});
