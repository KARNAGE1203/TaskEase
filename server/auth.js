const bcrypt = require('bcrypt');
const db = require('./config/database.js');

exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    let sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully');
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.send('Login successful');
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
};

exports.authenticate = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};
