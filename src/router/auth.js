//Start imports 
const express = require('express');
const AuthCtr = require("../controllers/auth");
//End imports

const router = express.Router();

//Start define routes
router.post("/register", AuthCtr.register);
router.post("/login",AuthCtr.login);
router.post("/refresh_access_token",AuthCtr.refreshAccessToken);
//End define routes

module.exports = router;
