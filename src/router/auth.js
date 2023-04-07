const express = require('express');
const AuthCtr = require("../controllers/auth");

const router = express.Router();


router.post("/register", AuthCtr.register);
router.post("/login",AuthCtr.login);

module.exports = router;
