// server/tasks.js
const express = require('express');
const db = require('./config/database.js');

const router = express.Router();

// Create a new task
router.post('/addTask', (req, res) => {
    const { user_id, title, description, category, deadline } = req.body;
    const query = "INSERT INTO tasks (user_id, title, description, category, deadline) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [user_id, title, description, category, deadline], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Task added successfully" });
    });
});

// Fetch tasks for a user
router.get('/tasks/:user_id', (req, res) => {
    const userId = req.params.user_id;
    db.query("SELECT * FROM tasks WHERE user_id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Mark a task as completed
router.put('/completeTask/:task_id', (req, res) => {
    const taskId = req.params.task_id;
    db.query("UPDATE tasks SET status = 'Completed' WHERE id = ?", [taskId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task marked as completed" });
    });
});

module.exports = router;
