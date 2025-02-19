const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Create a new task
router.post("/", taskController.createTask);

// Get all tasks for a user
router.get("/:userId", taskController.getTasks);

// Mark a task as completed
router.put("/:taskId", taskController.completeTask);

module.exports = router;
