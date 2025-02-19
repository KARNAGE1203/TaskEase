const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.registerUser);
router.post("/signin", authController.loginUser);

module.exports = router;
