const bcrypt = require("bcryptjs")
const connectDB = require('../database/db');
const User = require("../models/user")

async function getMe(req, res){
    await connectDB();
    const { user_id } = req.user;
    const response = await User.findById(user_id)

    if(!response){
        res.status(400).send({msg: "User not found"})
    }else{
        res.status(200).send(response)
    }
}

async function getUsers(req, res){
    await connectDB();
    const { active } = req.query;
    let response = null;

    if(active == undefined){
        response = await User.find();
    }else{
        response = await User.find({active});
    }
    res.status(200).send(response)
}

async function createUser(req, res){
    await connectDB();
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    if(req.files.avatar){
        //TODO
        console.log("avatar")
    }
    const user = new User({
        ...req.body,
        active: true,
        password: hashPassword
    });

    const response = await User.create(user);
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User created"})
    }
}

async function updateUser(req, res){
    await connectDB();
    const { id } = req.params;
    const userData = req.body;

    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    }else{
        delete userData.password;
    }
    const response = await User.findOneAndUpdate({_id: id},userData);
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User updated"})
    }
}

async function deleteUser(req, res){
    await connectDB();
    const { id } = req.params;
    const response = await User.findByIdAndUpdate({_id: id}, {active:false});
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User deleted"})
    }
}
module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}