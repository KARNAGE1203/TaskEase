const db = require("../config/db");

// Create a new task
exports.createTask = (userId, title, category, deadline, callback) => {
    const sql = "INSERT INTO tasks (user_id, title, category, deadline) VALUES (?, ?, ?, ?)";
    db.query(sql, [userId, title, category, deadline], callback);
};

// Get tasks for a user
exports.getTasksByUser = (userId, callback) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(sql, [userId], callback);
};

// Mark a task as completed
exports.completeTask = (taskId, callback) => {
    const sql = "UPDATE tasks SET status = 'Completed' WHERE id = ?";
    db.query(sql, [taskId], callback);
};
