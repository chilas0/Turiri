const express = require('express');
const AuthCtr = require("../controllers/auth");

const router = express.Router();


router.post("/register", AuthCtr.register);
router.post("/login",AuthCtr.login);
router.post("/refresh_access_token",AuthCtr.refreshAccessToken);


module.exports = router;
