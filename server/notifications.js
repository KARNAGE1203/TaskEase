// server/notifications.js
const express = require('express');
const nodemailer = require('nodemailer');
const db = require('./config/database.js');

const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sainidanish1229@gmail.com',
        pass: 'your_email_password'
    }
});

// Send notifications for upcoming tasks
router.get('/sendNotifications', (req, res) => {
    const now = new Date();
    db.query("SELECT * FROM tasks WHERE status = 'Pending' AND deadline BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)", (err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });

        tasks.forEach(task => {
            const mailOptions = {
                from: 'sainidanish1229@gmail.com',
                to: task.user_email, 
                subject: 'Task Reminder',
                text: `Reminder: Your task "${task.title}" is due soon!`
            };
            transporter.sendMail(mailOptions);
        });

        res.json({ message: "Notifications sent" });
    });
});

module.exports = router;
