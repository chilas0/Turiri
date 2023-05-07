//Start imports 
const express = require('express');
const UserCtr = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty")
//End imports

const md_upload = multiparty({uploadDir: "../uploads/avatar"})
const router = express.Router();

//Start define routes
router.get("/me", [md_auth.asureAuth] , UserCtr.getMe);
router.get("/users", [md_auth.asureAuth] , UserCtr.getUsers);
router.post("/user", [md_auth.asureAuth, md_upload] , UserCtr.createUser);
router.patch("/user/:id", [md_auth.asureAuth, md_upload] , UserCtr.updateUser);
router.patch("/delete/:id", [md_auth.asureAuth, md_upload] , UserCtr.deleteUser);
//End define routes


module.exports = router;