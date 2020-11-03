const express = require("express");
const router = express.Router();
const authService = require("../services/auth-service");

router.post("/", (req, res) => res.send(authService.generateToken(req.body.username, req.body.password)))

module.exports = router