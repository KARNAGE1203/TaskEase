const TaskModel = require("../models/TaskModel");

// ✅ Create a new task
exports.createTask = (req, res) => {
    const { userId, title, category, deadline } = req.body;

    if (!userId || !title || !category || !deadline) {
        return res.status(400).json({ error: "All fields are required." });
    }

    TaskModel.createTask(userId, title, category, deadline, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Task added successfully", taskId: result.insertId });
    });
};

// ✅ Get all tasks for a user
exports.getTasks = (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    TaskModel.getTasksByUser(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ✅ Mark a task as completed
exports.completeTask = (req, res) => {
    const taskId = req.params.taskId;

    if (!taskId) {
        return res.status(400).json({ error: "Task ID is required." });
    }

    TaskModel.completeTask(taskId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task marked as completed" });
    });
};
